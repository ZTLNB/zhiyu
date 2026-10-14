param([string]$Go = 'go')
$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
    & $Go test ./...
    if ($LASTEXITCODE -ne 0) { throw 'Tests failed.' }
    & $Go build -trimpath -ldflags '-s -w' -o zhiyu.exe .
    if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
    & .\zhiyu.exe -h
} finally { Pop-Location }
