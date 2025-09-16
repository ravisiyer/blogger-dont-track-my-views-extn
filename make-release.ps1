# make-release.ps1
# Creates a release.zip containing only the Chrome extension files needed for installation

# --- CONFIG ---
$ReleaseName = "dont-track-my-views.zip"
$IncludePaths = @(
    "manifest.json",
    "background.js",
    "popup.html",
    "popup.js",
    "config.js",
    "config.default.js",
    "utils.js",
    "icons"        # folder (will include all files inside)
)

# --- SCRIPT ---
$ReleasePath = Join-Path -Path (Get-Location) -ChildPath $ReleaseName

# Check if old release zip exists
if (Test-Path $ReleasePath) {
    Write-Error "ERROR: $ReleaseName already exists. Please delete or move it before running this script."
    exit 1
}

# Create a temporary staging folder
$TempFolder = Join-Path $env:TEMP "extn_release_$(Get-Random)"
New-Item -ItemType Directory -Path $TempFolder | Out-Null

# Copy only required files/folders into staging folder
foreach ($item in $IncludePaths) {
    if (Test-Path $item) {
        Copy-Item $item -Destination $TempFolder -Recurse
        Write-Host "Added: $item"
    } else {
        Write-Warning "Missing: $item (skipped)"
    }
}

# Create the zip archive
Compress-Archive -Path (Join-Path $TempFolder "*") -DestinationPath $ReleasePath

# Clean up temp folder
Remove-Item $TempFolder -Recurse -Force

Write-Host "`nCreated $ReleaseName in repo root"
