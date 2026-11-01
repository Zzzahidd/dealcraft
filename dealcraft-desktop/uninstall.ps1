# ==============================================================================
# Dealcraft - Complete Clean Uninstaller
# Terminates processes, removes startup autostart, cleans shortcuts, registry & files
# ==============================================================================

$ErrorActionPreference = "SilentlyContinue"

Write-Host "Uninstalling Dealcraft..." -ForegroundColor Cyan

# 1. Terminate all running Dealcraft and legacy instances
Write-Host "Stopping running application instances..." -ForegroundColor Gray
Get-CimInstance Win32_Process -Filter "Name = 'Dealcraft.exe' OR Name = 'dealcraft.exe' OR Name = 'Gr8r Studio CRM.exe' OR Name = 'gr8r-studio-crm.exe'" -ErrorAction SilentlyContinue | Invoke-CimMethod -MethodName Terminate -ErrorAction SilentlyContinue | Out-Null
Get-CimInstance Win32_Process | Where-Object { $_.Name -eq "node.exe" -and $_.CommandLine -like "*desktop-service.mjs*" } | Invoke-CimMethod -MethodName Terminate -ErrorAction SilentlyContinue | Out-Null

try {
    & taskkill.exe /F /IM "Dealcraft.exe" 2>$null | Out-Null
    & taskkill.exe /F /IM "dealcraft.exe" 2>$null | Out-Null
    & taskkill.exe /F /IM "Gr8r Studio CRM.exe" 2>$null | Out-Null
    & taskkill.exe /F /IM "gr8r-studio-crm.exe" 2>$null | Out-Null
} catch {}

Get-Process -Name "*Dealcraft*", "*Gr8r*" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Milliseconds 600

# 2. Remove Windows Startup entry and Startup folder shortcut
Write-Host "Removing Windows startup autostart..." -ForegroundColor Gray
Remove-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' -Name 'Dealcraft' -ErrorAction SilentlyContinue
Remove-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' -Name 'Gr8rStudioCRM' -ErrorAction SilentlyContinue

$startupPath = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Startup)
$startupShortcut = Join-Path $startupPath "Dealcraft.lnk"
if (Test-Path $startupShortcut) { Remove-Item -Path $startupShortcut -Force -ErrorAction SilentlyContinue }
$oldStartupShortcut = Join-Path $startupPath "Gr8r Studio CRM.lnk"
if (Test-Path $oldStartupShortcut) { Remove-Item -Path $oldStartupShortcut -Force -ErrorAction SilentlyContinue }

# 3. Remove Desktop Shortcut
Write-Host "Removing shortcuts..." -ForegroundColor Gray
$desktopPath = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Desktop)
$desktopShortcut = Join-Path $desktopPath "Dealcraft.lnk"
if (Test-Path $desktopShortcut) { Remove-Item -Path $desktopShortcut -Force -ErrorAction SilentlyContinue }
$oldDesktopShortcut = Join-Path $desktopPath "Gr8r Studio CRM.lnk"
if (Test-Path $oldDesktopShortcut) { Remove-Item -Path $oldDesktopShortcut -Force -ErrorAction SilentlyContinue }

# 4. Remove Start Menu Shortcut
$programsPath = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Programs)
$startMenuFolder = Join-Path $programsPath "Dealcraft"
if (Test-Path $startMenuFolder) { Remove-Item -Path $startMenuFolder -Recurse -Force -ErrorAction SilentlyContinue }
$oldStartMenuFolder = Join-Path $programsPath "Gr8r Studio CRM"
if (Test-Path $oldStartMenuFolder) { Remove-Item -Path $oldStartMenuFolder -Recurse -Force -ErrorAction SilentlyContinue }

# 5. Remove Windows Settings / Installed Apps Registry Entry
Write-Host "Unregistering from Windows Installed Apps..." -ForegroundColor Gray
Remove-Item -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Dealcraft" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Gr8r Studio CRM" -Recurse -Force -ErrorAction SilentlyContinue

# 6. Delete Installed Application Files
$localPrograms = [System.IO.Path]::Combine($env:LOCALAPPDATA, "Programs")
$targetDir = [System.IO.Path]::Combine($localPrograms, "Dealcraft")
if (Test-Path $targetDir) {
    Remove-Item -Path $targetDir -Recurse -Force -ErrorAction SilentlyContinue
}
$oldTargetDir = [System.IO.Path]::Combine($localPrograms, "Gr8r Studio CRM")
if (Test-Path $oldTargetDir) {
    Remove-Item -Path $oldTargetDir -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Dealcraft uninstalled successfully." -ForegroundColor Green
