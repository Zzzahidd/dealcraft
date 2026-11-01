# ==============================================================================
# Dealcraft - Native Desktop Installer
# Installs like Antigravity to %LOCALAPPDATA%\Programs\Dealcraft
# ==============================================================================

$ErrorActionPreference = "Stop"
$sourceDir = $PSScriptRoot

$localPrograms = [System.IO.Path]::Combine($env:LOCALAPPDATA, "Programs")
$targetDir = [System.IO.Path]::Combine($localPrograms, "Dealcraft")
$desktopPath = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Desktop)
$startMenuPrograms = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Programs)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Installing Dealcraft Desktop Application" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Terminate running instances
try {
    Get-Process -Name "*Dealcraft*", "*Gr8r*" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 400
} catch {}

# 1. Create Target Directory
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

# 2. Copy Binary & Core Dependencies
Write-Host "Copying application binaries and desktop logic..." -ForegroundColor Gray
$exeCandidate = Join-Path $sourceDir "Dealcraft.exe"
if (!(Test-Path $exeCandidate)) { $exeCandidate = Join-Path $sourceDir "Gr8r Studio CRM.exe" }
if (!(Test-Path $exeCandidate)) { $exeCandidate = Join-Path $sourceDir "src-tauri\target\release\dealcraft.exe" }
if (!(Test-Path $exeCandidate)) { $exeCandidate = Join-Path $sourceDir "src-tauri\target\release\gr8r-studio-crm.exe" }

Copy-Item $exeCandidate (Join-Path $targetDir "Dealcraft.exe") -Force
if (Test-Path (Join-Path $sourceDir "WebView2Loader.dll")) {
    Copy-Item (Join-Path $sourceDir "WebView2Loader.dll") (Join-Path $targetDir "WebView2Loader.dll") -Force
}

# Copy Server & Uninstaller
$targetServerDir = Join-Path $targetDir "server"
if (!(Test-Path $targetServerDir)) {
    New-Item -ItemType Directory -Path $targetServerDir -Force | Out-Null
}
Copy-Item (Join-Path $sourceDir "server\desktop-service.mjs") (Join-Path $targetServerDir "desktop-service.mjs") -Force
Copy-Item (Join-Path $sourceDir "uninstall.ps1") (Join-Path $targetDir "uninstall.ps1") -Force
Copy-Item (Join-Path $sourceDir "Uninstall.exe") (Join-Path $targetDir "Uninstall.exe") -Force

# Copy App Icon
$iconDir = Join-Path $targetDir "icons"
if (!(Test-Path $iconDir)) {
    New-Item -ItemType Directory -Path $iconDir -Force | Out-Null
}
Copy-Item (Join-Path $sourceDir "src-tauri\icons\icon.ico") (Join-Path $iconDir "icon.ico") -Force
Copy-Item (Join-Path $sourceDir "src-tauri\icons\dealcraft.ico") (Join-Path $iconDir "dealcraft.ico") -Force

$installedExe = Join-Path $targetDir "Dealcraft.exe"
$installedIcon = Join-Path $iconDir "dealcraft.ico"
if (!(Test-Path $installedIcon)) { $installedIcon = Join-Path $iconDir "icon.ico" }

# Clean up legacy desktop shortcut
$oldDesktopShortcut = Join-Path $desktopPath "Gr8r Studio CRM.lnk"
if (Test-Path $oldDesktopShortcut) { Remove-Item $oldDesktopShortcut -Force -ErrorAction SilentlyContinue }

# Clean up legacy start menu
$oldStartMenu = Join-Path $startMenuPrograms "Gr8r Studio CRM"
if (Test-Path $oldStartMenu) { Remove-Item $oldStartMenu -Recurse -Force -ErrorAction SilentlyContinue }

# Clean up legacy startup
$startupPrograms = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Startup)
$oldStartup = Join-Path $startupPrograms "Gr8r Studio CRM.lnk"
if (Test-Path $oldStartup) { Remove-Item $oldStartup -Force -ErrorAction SilentlyContinue }

# 3. Create Desktop Shortcut
Write-Host "Creating Desktop shortcut..." -ForegroundColor Gray
$wsh = New-Object -ComObject WScript.Shell

$desktopDirs = @(
    $desktopPath,
    (Join-Path $env:USERPROFILE "Desktop"),
    (Join-Path $env:USERPROFILE "OneDrive\Desktop")
) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -Unique

foreach ($dDir in $desktopDirs) {
    $scPath = Join-Path $dDir "Dealcraft.lnk"
    $shortcut = $wsh.CreateShortcut($scPath)
    $shortcut.TargetPath = $installedExe
    $shortcut.WorkingDirectory = $targetDir
    $shortcut.IconLocation = "$installedIcon, 0"
    $shortcut.Description = "Dealcraft: Unified calm workspace and sales CRM desktop application"
    $shortcut.Save()
    (Get-Item $scPath).LastWriteTime = Get-Date
}

# 4. Create Start Menu Entry
Write-Host "Creating Start Menu entry..." -ForegroundColor Gray
$startMenuAppDir = Join-Path $startMenuPrograms "Dealcraft"
if (!(Test-Path $startMenuAppDir)) {
    New-Item -ItemType Directory -Path $startMenuAppDir -Force | Out-Null
}
$startMenuShortcutPath = Join-Path $startMenuAppDir "Dealcraft.lnk"
$menuShortcut = $wsh.CreateShortcut($startMenuShortcutPath)
$menuShortcut.TargetPath = $installedExe
$menuShortcut.WorkingDirectory = $targetDir
$menuShortcut.IconLocation = "$installedIcon, 0"
$menuShortcut.Description = "Dealcraft: Unified calm workspace and sales CRM desktop application"
$menuShortcut.Save()

# 5. Create Startup Shortcut
Write-Host "Creating Startup shortcut for background Ctrl+Space..." -ForegroundColor Gray
$startupShortcutPath = Join-Path $startupPrograms "Dealcraft.lnk"
$startupShortcut = $wsh.CreateShortcut($startupShortcutPath)
$startupShortcut.TargetPath = $installedExe
$startupShortcut.Arguments = "--background"
$startupShortcut.WorkingDirectory = $targetDir
$startupShortcut.IconLocation = "$installedIcon, 0"
$startupShortcut.Description = "Dealcraft: Background global hotkey listener"
$startupShortcut.Save()

# 6. Register with Windows Settings (Installed Apps / Add-Remove Programs)
Write-Host "Registering in Windows Settings Installed Apps..." -ForegroundColor Gray
$uninstallKeyPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Dealcraft"
if (!(Test-Path $uninstallKeyPath)) {
    New-Item -Path $uninstallKeyPath -Force | Out-Null
}

$uninstallExe = Join-Path $targetDir "Uninstall.exe"
$uninstallCmd = "`"$uninstallExe`""
Set-ItemProperty -Path $uninstallKeyPath -Name "DisplayName" -Value "Dealcraft 1.0.0"
Set-ItemProperty -Path $uninstallKeyPath -Name "DisplayIcon" -Value "$installedIcon,0"
Set-ItemProperty -Path $uninstallKeyPath -Name "DisplayVersion" -Value "1.0.0"
Set-ItemProperty -Path $uninstallKeyPath -Name "Publisher" -Value "Dealcraft"
Set-ItemProperty -Path $uninstallKeyPath -Name "InstallLocation" -Value $targetDir
Set-ItemProperty -Path $uninstallKeyPath -Name "UninstallString" -Value $uninstallCmd
Set-ItemProperty -Path $uninstallKeyPath -Name "QuietUninstallString" -Value "`"$uninstallExe`" /S"

# Clean legacy registry
Remove-Item -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Gr8r Studio CRM" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "  - Install Path:    $targetDir" -ForegroundColor White
Write-Host "  - Desktop Icon:    $desktopShortcutPath" -ForegroundColor White
Write-Host "  - Start Menu:      $startMenuShortcutPath" -ForegroundColor White
Write-Host "  - Windows Apps:    Registered in Windows Settings -> Installed Apps" -ForegroundColor White
Write-Host ""
Write-Host "You can now launch 'Dealcraft' from your Desktop or Start Menu!" -ForegroundColor Cyan
