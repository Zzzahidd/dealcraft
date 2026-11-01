@echo off
title Dealcraft
cd /d "%~dp0"

REM 1. Start Node.js Desktop Logic Service (persistence & fuzzy search)
start /b "" node server\desktop-service.mjs

REM 2. Start native Tauri v2 desktop application executable
if exist "%~dp0Dealcraft.exe" (
    start "" "%~dp0Dealcraft.exe"
) else if exist "%~dp0Gr8r Studio CRM.exe" (
    start "" "%~dp0Gr8r Studio CRM.exe"
) else (
    start "" powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0desktop-host.ps1"
)
