use std::fs;
use std::path::PathBuf;
use std::sync::atomic::{AtomicU64, Ordering};
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::{Emitter, Manager};

static LAST_TOGGLE_MS: AtomicU64 = AtomicU64::new(0);

fn get_storage_path() -> PathBuf {
    let home = std::env::var("USERPROFILE")
        .or_else(|_| std::env::var("HOME"))
        .unwrap_or_else(|_| ".".to_string());
    let mut path = PathBuf::from(home);
    path.push(".gr8r-studio-crm");
    if !path.exists() {
        let _ = fs::create_dir_all(&path);
    }
    path.push("workspace-data.json");
    path
}

#[tauri::command]
fn exit_app(app: tauri::AppHandle) -> Result<(), String> {
    app.exit(0);
    Ok(())
}

#[tauri::command]
fn open_main_window(
    app: tauri::AppHandle,
    route: Option<String>,
    payload: Option<String>,
) -> Result<(), String> {
    // 1. Immediately hide spotlight so it does not stay on top and cause DWM compositor conflict
    if let Some(spotlight) = app.get_webview_window("spotlight") {
        let _ = spotlight.hide();
    }

    // 2. Activate and display main window cleanly
    if let Some(main) = app.get_webview_window("main") {
        if let Some(ref p) = payload {
            let _ = main.emit("workspace-action", p.clone());
        } else if let Some(ref r) = route {
            let _ = main.emit("navigate-to", r.clone());
        }

        let _ = main.show();
        let _ = main.unminimize();
        let _ = main.set_focus();

        #[cfg(target_os = "windows")]
        {
            if let Ok(hwnd) = main.hwnd() {
                unsafe extern "system" {
                    fn SetForegroundWindow(hwnd: isize) -> i32;
                    fn BringWindowToTop(hwnd: isize) -> i32;
                }
                unsafe {
                    BringWindowToTop(hwnd.0 as isize);
                    SetForegroundWindow(hwnd.0 as isize);
                }
            }
        }
    }

    Ok(())
}

#[tauri::command]
fn hide_spotlight(app: tauri::AppHandle) -> Result<(), String> {
    if let Some(spotlight) = app.get_webview_window("spotlight") {
        let _ = spotlight.hide();
    }
    Ok(())
}

#[tauri::command]
fn toggle_spotlight(app: tauri::AppHandle) -> Result<(), String> {
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis() as u64;
    let prev = LAST_TOGGLE_MS.swap(now, Ordering::Relaxed);
    if now.saturating_sub(prev) < 250 {
        return Ok(());
    }

    if let Some(spotlight) = app.get_webview_window("spotlight") {
        let is_vis = spotlight.is_visible().unwrap_or(false);
        if is_vis {
            let _ = spotlight.hide();
        } else {
            // Position spotlight slightly above center on active monitor (Spotlight ratio)
            if let Ok(Some(monitor)) = spotlight.current_monitor() {
                let screen_size = monitor.size();
                let width = 640;
                let _height = 480;
                let x = (screen_size.width as i32 - width) / 2;
                let y = (screen_size.height as i32 * 20) / 100;
                let _ = spotlight.set_position(tauri::Position::Physical(tauri::PhysicalPosition { x, y }));
            }
            let _ = spotlight.show();
            let _ = spotlight.unminimize();
            let _ = spotlight.set_always_on_top(true);
            let _ = spotlight.set_focus();

            #[cfg(target_os = "windows")]
            {
                if let Ok(hwnd) = spotlight.hwnd() {
                    unsafe extern "system" {
                        fn SetForegroundWindow(hwnd: isize) -> i32;
                        fn BringWindowToTop(hwnd: isize) -> i32;
                    }
                    unsafe {
                        BringWindowToTop(hwnd.0 as isize);
                        SetForegroundWindow(hwnd.0 as isize);
                    }
                }
            }

            let _ = spotlight.emit("spotlight-show", ());
        }
    } else if let Some(main) = app.get_webview_window("main") {
        let _ = main.show();
        let _ = main.unminimize();
        let _ = main.set_focus();
        let _ = main.emit("toggle-raycast", ());
    }
    Ok(())
}

#[tauri::command]
fn resize_spotlight(app: tauri::AppHandle, width: f64, height: f64) -> Result<(), String> {
    if let Some(spotlight) = app.get_webview_window("spotlight") {
        let _ = spotlight.set_size(tauri::Size::Logical(tauri::LogicalSize { width, height }));
    }
    Ok(())
}

#[tauri::command]
fn move_spotlight(app: tauri::AppHandle, x: f64, y: f64) -> Result<(), String> {
    if let Some(spotlight) = app.get_webview_window("spotlight") {
        let _ = spotlight.set_position(tauri::Position::Logical(tauri::LogicalPosition { x, y }));
    }
    Ok(())
}

#[tauri::command]
fn start_spotlight_resize(window: tauri::WebviewWindow, direction: String) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        if let Ok(hwnd) = window.hwnd() {
            let hit_test: usize = match direction.to_lowercase().as_str() {
                "e" | "r" | "east" | "right" => 11, // HTRIGHT
                "w" | "l" | "west" | "left" => 10,  // HTLEFT
                "n" | "t" | "north" | "top" => 12,   // HTTOP
                "s" | "b" | "south" | "bottom" => 15, // HTBOTTOM
                "se" | "br" | "southeast" | "bottomright" => 17, // HTBOTTOMRIGHT
                "sw" | "bl" | "southwest" | "bottomleft" => 16,  // HTBOTTOMLEFT
                "ne" | "tr" | "northeast" | "topright" => 14,   // HTTOPRIGHT
                "nw" | "tl" | "northwest" | "topleft" => 13,    // HTTOPLEFT
                _ => 17,
            };
            #[repr(C)]
            struct POINT {
                x: i32,
                y: i32,
            }
            unsafe extern "system" {
                fn GetCursorPos(lpPoint: *mut POINT) -> i32;
                fn ReleaseCapture() -> i32;
                fn SendMessageW(hwnd: isize, msg: u32, wparam: usize, lparam: isize) -> isize;
            }
            let mut pt = POINT { x: 0, y: 0 };
            unsafe {
                GetCursorPos(&mut pt);
                ReleaseCapture();
                let lparam = ((pt.y as isize) << 16) | ((pt.x as isize) & 0xFFFF);
                SendMessageW(hwnd.0 as isize, 0x00A1, hit_test, lparam);
            }
        }
    }
    Ok(())
}

#[tauri::command]
fn start_spotlight_drag(window: tauri::WebviewWindow) -> Result<(), String> {
    let _ = window.start_dragging();
    Ok(())
}

#[tauri::command]
fn save_workspace_data(json: String) -> Result<(), String> {
    let path = get_storage_path();
    fs::write(&path, json).map_err(|e| e.to_string())
}

#[tauri::command]
fn load_workspace_data() -> Result<Option<String>, String> {
    let path = get_storage_path();
    if path.exists() {
        let data = fs::read_to_string(&path).map_err(|e| e.to_string())?;
        Ok(Some(data))
    } else {
        Ok(None)
    }
}

#[cfg(target_os = "windows")]
fn start_global_hotkey_listener(app_handle: tauri::AppHandle) {
    std::thread::spawn(move || {
        #[repr(C)]
        struct POINT {
            x: i32,
            y: i32,
        }

        #[repr(C)]
        struct MSG {
            hwnd: isize,
            message: u32,
            w_param: usize,
            l_param: isize,
            time: u32,
            pt: POINT,
        }

        unsafe extern "system" {
            fn RegisterHotKey(hwnd: isize, id: i32, fs_modifiers: u32, vk: u32) -> i32;
            fn GetMessageW(lp_msg: *mut MSG, hwnd: isize, w_msg_filter_min: u32, w_msg_filter_max: u32) -> i32;
            fn TranslateMessage(lp_msg: *const MSG) -> i32;
            fn DispatchMessageW(lp_msg: *const MSG) -> isize;
        }

        const MOD_ALT: u32 = 0x0001;
        const MOD_CONTROL: u32 = 0x0002;
        const MOD_NOREPEAT: u32 = 0x4000;
        const VK_SPACE: u32 = 0x20;
        const WM_HOTKEY: u32 = 0x0312;

        unsafe {
            // Hotkey 101: Ctrl + Space
            RegisterHotKey(0, 101, MOD_CONTROL | MOD_NOREPEAT, VK_SPACE);
            // Hotkey 102: Alt + Space (standard Raycast shortcut)
            RegisterHotKey(0, 102, MOD_ALT | MOD_NOREPEAT, VK_SPACE);
            // Hotkey 103: Ctrl + Alt + Space
            RegisterHotKey(0, 103, MOD_CONTROL | MOD_ALT | MOD_NOREPEAT, VK_SPACE);

            let mut msg: MSG = std::mem::zeroed();
            while GetMessageW(&mut msg, 0, 0, 0) > 0 {
                if msg.message == WM_HOTKEY {
                    let _ = toggle_spotlight(app_handle.clone());
                }
                TranslateMessage(&msg);
                DispatchMessageW(&msg);
            }
        }
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[cfg(target_os = "windows")]
    let wake_event: isize = {
        use std::os::raw::c_void;
        use std::ptr;

        unsafe extern "system" {
            fn CreateMutexW(lpMutexAttributes: *mut c_void, bInitialOwner: i32, lpName: *const u16) -> isize;
            fn GetLastError() -> u32;
            fn CloseHandle(hObject: isize) -> i32;
            fn CreateEventW(lpEventAttributes: *mut c_void, bManualReset: i32, bInitialState: i32, lpName: *const u16) -> isize;
            fn OpenEventW(dwDesiredAccess: u32, bInheritHandle: i32, lpName: *const u16) -> isize;
            fn SetEvent(hEvent: isize) -> i32;
            fn FindWindowW(lpClassName: *const u16, lpWindowName: *const u16) -> isize;
            fn ShowWindow(hWnd: isize, nCmdShow: i32) -> i32;
            fn SetForegroundWindow(hWnd: isize) -> i32;
            fn BringWindowToTop(hWnd: isize) -> i32;
            fn IsIconic(hWnd: isize) -> i32;
        }

        const ERROR_ALREADY_EXISTS: u32 = 183;
        const EVENT_MODIFY_STATE: u32 = 0x0002;
        const SW_RESTORE: i32 = 9;
        const SW_SHOW: i32 = 5;
        const SW_MAXIMIZE: i32 = 3;

        let mutex_name: Vec<u16> = "Local\\Dealcraft_SingleInstance_Mutex\0".encode_utf16().collect();
        let event_name: Vec<u16> = "Local\\Dealcraft_WakeEvent\0".encode_utf16().collect();
        let window_title: Vec<u16> = "Dealcraft\0".encode_utf16().collect();

        unsafe {
            let mutex = CreateMutexW(ptr::null_mut(), 1, mutex_name.as_ptr());
            if mutex != 0 && GetLastError() == ERROR_ALREADY_EXISTS {
                // Secondary instance: signal the wake event to the running primary instance!
                let ev = OpenEventW(EVENT_MODIFY_STATE, 0, event_name.as_ptr());
                if ev != 0 {
                    SetEvent(ev);
                    CloseHandle(ev);
                }

                // Also directly bring the window forward via Win32 if possible
                let hwnd = FindWindowW(ptr::null(), window_title.as_ptr());
                if hwnd != 0 {
                    if IsIconic(hwnd) != 0 {
                        ShowWindow(hwnd, SW_RESTORE);
                    } else {
                        ShowWindow(hwnd, SW_SHOW);
                    }
                    BringWindowToTop(hwnd);
                    SetForegroundWindow(hwnd);
                }

                CloseHandle(mutex);
                // Exit immediately before WebView2 or Tauri even start, preventing any 0x800700AA crash!
                std::process::exit(0);
            }

            // Primary instance: create the wake event
            CreateEventW(ptr::null_mut(), 0, 0, event_name.as_ptr())
        }
    };

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open_main_window,
            hide_spotlight,
            toggle_spotlight,
            resize_spotlight,
            move_spotlight,
            start_spotlight_drag,
            start_spotlight_resize,
            save_workspace_data,
            load_workspace_data,
            exit_app
        ])
        .setup(move |app| {
            // Auto-hide spotlight on blur (loss of focus)
            if let Some(spotlight) = app.get_webview_window("spotlight") {
                let spotlight_clone = spotlight.clone();
                spotlight.on_window_event(move |event| {
                    if let tauri::WindowEvent::Focused(false) = event {
                        let _ = spotlight_clone.hide();
                    }
                });
            }

            // Always ensure the main window is visible, unminimized, and focused on open!
            if let Some(main) = app.get_webview_window("main") {
                let main_clone = main.clone();
                main.on_window_event(move |event| {
                    if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                        api.prevent_close();
                        let _ = main_clone.hide();
                    }
                });

                let is_bg = std::env::args().any(|a| a == "--background" || a == "--silent");
                if is_bg {
                    let _ = main.hide();
                } else {
                    let _ = main.show();
                    let _ = main.unminimize();
                    let _ = main.set_focus();
                }
            }

            // Windows specific wake listener & global hotkeys
            #[cfg(target_os = "windows")]
            {
                // Background listener for secondary instance wake signals
                if wake_event != 0 {
                    let app_handle = app.handle().clone();
                    std::thread::spawn(move || {
                        unsafe extern "system" {
                            fn WaitForSingleObject(hHandle: isize, dwMilliseconds: u32) -> u32;
                            fn ShowWindow(hWnd: isize, nCmdShow: i32) -> i32;
                            fn SetForegroundWindow(hWnd: isize) -> i32;
                            fn BringWindowToTop(hWnd: isize) -> i32;
                            fn IsIconic(hWnd: isize) -> i32;
                        }
                        const INFINITE: u32 = 0xFFFFFFFF;
                        const SW_RESTORE: i32 = 9;
                        const SW_SHOW: i32 = 5;

                        loop {
                            let res = unsafe { WaitForSingleObject(wake_event, INFINITE) };
                            if res == 0 {
                                if let Some(main) = app_handle.get_webview_window("main") {
                                    let _ = main.show();
                                    let _ = main.unminimize();
                                    let _ = main.set_focus();

                                    if let Ok(hwnd) = main.hwnd() {
                                        unsafe {
                                            if IsIconic(hwnd.0 as isize) != 0 {
                                                ShowWindow(hwnd.0 as isize, SW_RESTORE);
                                            } else {
                                                ShowWindow(hwnd.0 as isize, SW_SHOW);
                                            }
                                            BringWindowToTop(hwnd.0 as isize);
                                            SetForegroundWindow(hwnd.0 as isize);
                                        }
                                    }
                                }
                            }
                        }
                    });
                }

                // Register OS-wide global hotkeys for Ctrl+Space and Alt+Space
                start_global_hotkey_listener(app.handle().clone());
            }

            let _handle = app.handle();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
