#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::OpenOptions;
use std::io::Write;

fn main() {
    std::panic::set_hook(Box::new(|info| {
        let msg = format!("PANIC: {}\n", info);
        let _ = OpenOptions::new()
            .create(true)
            .append(true)
            .open("tauri_startup.log")
            .and_then(|mut f| f.write_all(msg.as_bytes()));
    }));

    app_lib::run();
}
