# PowerShell script to install Node.js (if possible) and run the dev server
# Usage: run PowerShell as Administrator and execute: .\scripts\install-and-run.ps1

function Require-Admin {
    $current = [Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()
    if (-not $current.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
        Write-Host "This script must be run as Administrator. Right-click PowerShell and choose 'Run as Administrator'." -ForegroundColor Yellow
        exit 1
    }
}

function Install-NodeWithWinget {
    Write-Host "Attempting to install Node.js using winget..."
    winget install OpenJS.Node.LTS -e --accept-package-agreements --accept-source-agreements
}

function Install-NodeWithChoco {
    Write-Host "Attempting to install Node.js using Chocolatey..."
    choco install nodejs-lts -y
}

function Run-NpmInstallAndDev {
    Write-Host "Running npm install..."
    npm install
    if ($LASTEXITCODE -ne 0) { Write-Host "npm install failed." -ForegroundColor Red; exit 1 }

    Write-Host "Starting dev server (npm run dev). Press Ctrl+C to stop."
    npm run dev
}

# --- Main ---
Require-Admin

# Change to repo root (script assumes it lives inside repo/scripts)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $scriptDir "..")
Set-Location $repoRoot
Write-Host "Working directory: $PWD"

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if ($null -ne $nodeCmd) {
    Write-Host "Node is already installed: $($nodeCmd.Path)" -ForegroundColor Green
    Run-NpmInstallAndDev
    exit 0
}

$wingetCmd = Get-Command winget -ErrorAction SilentlyContinue
$chocoCmd = Get-Command choco -ErrorAction SilentlyContinue

if ($wingetCmd) {
    try {
        Install-NodeWithWinget
    } catch {
        Write-Host "winget installation failed: $_" -ForegroundColor Yellow
    }
}

if (-not (Get-Command node -ErrorAction SilentlyContinue) -and $chocoCmd) {
    try {
        Install-NodeWithChoco
    } catch {
        Write-Host "choco installation failed: $_" -ForegroundColor Yellow
    }
}

# Re-check node
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Automatic installation could not be completed. Please install Node.js LTS manually from https://nodejs.org/ and re-run this script as Administrator." -ForegroundColor Red
    exit 2
}

Run-NpmInstallAndDev
