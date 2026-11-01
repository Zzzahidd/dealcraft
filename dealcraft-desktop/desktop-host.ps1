# ==============================================================================
# Dealcraft - Native Desktop Host
# Launches the standalone desktop window with native hardware acceleration
# ==============================================================================

$appDir = $PSScriptRoot
Set-Location $appDir

# Ensure dist exists
if (!(Test-Path "dist\index.html")) {
    npm run build
}

# Start local desktop server on 5173 if not already running
$serverRunning = $false
try {
    $res = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 1 -ErrorAction SilentlyContinue
    if ($res.StatusCode -eq 200) { $serverRunning = $true }
} catch {
    $serverRunning = $false
}

if (!$serverRunning) {
    Start-Process -FilePath "npm.cmd" -ArgumentList "run preview -- --port 5173 --host 127.0.0.1" -WindowStyle Hidden
    Start-Sleep -Milliseconds 800
}

# Find Edge / WebView2 runtime
$edgePaths = @(
    "$env:ProgramFiles (x86)\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe"
)

$edgeExe = $null
foreach ($p in $edgePaths) {
    if (Test-Path $p) {
        $edgeExe = $p
        break
    }
}

$userDir = Join-Path $env:USERPROFILE ".dealcraft\webview-data"
if (!(Test-Path $userDir)) {
    New-Item -ItemType Directory -Path $userDir -Force | Out-Null
}

if ($edgeExe) {
    # Launch in standalone frameless app mode
    Start-Process -FilePath $edgeExe -ArgumentList "--app=http://127.0.0.1:5173", "--window-size=1320,860", "--user-data-dir=`"$userDir`"", "--enable-features=OverlayScrollbar,VaapiVideoDecoder", "--disable-features=TranslateUI"
} else {
    Start-Process "http://127.0.0.1:5173"
}
