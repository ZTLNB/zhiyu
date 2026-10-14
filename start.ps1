param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$taskAppExecutable = Join-Path $PSScriptRoot 'zhiyu.exe'
$taskAppDataDirectory = Join-Path $PSScriptRoot 'data'
$taskAppUrl = 'http://127.0.0.1:8787'
if (-not (Test-Path -LiteralPath $taskAppExecutable)) { throw 'Please build zhiyu.exe first.' }
$taskAppHealth = $null
try { $taskAppHealth = Invoke-RestMethod -Uri ($taskAppUrl + '/api/health') -TimeoutSec 2 } catch {}
if ($taskAppHealth -and $taskAppHealth.name -ne ([string][char]0x77E5 + [string][char]0x5C7F)) { throw 'Port 8787 is in use.' }
if ($taskAppHealth -and $taskAppHealth.dataDirectory -ne $taskAppDataDirectory) { throw 'A different workspace is already using port 8787.' }
if (-not $taskAppHealth) {
    New-Item -ItemType Directory -Force -Path $taskAppDataDirectory | Out-Null
    $taskAppProcess = Start-Process -FilePath $taskAppExecutable -ArgumentList @('-port', '8787') -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $taskAppDataDirectory 'server.log') -RedirectStandardError (Join-Path $taskAppDataDirectory 'error.log')
    $taskAppProcess.Id | Set-Content -LiteralPath (Join-Path $taskAppDataDirectory 'server.pid')
    $taskAppReady = $false
    for ($taskAppAttempt = 0; $taskAppAttempt -lt 30; $taskAppAttempt++) {
        try { $taskAppHealth = Invoke-RestMethod -Uri ($taskAppUrl + '/api/health') -TimeoutSec 1; $taskAppReady = $taskAppHealth.status -eq 'ok' -and $taskAppHealth.name -eq ([string][char]0x77E5 + [string][char]0x5C7F); if ($taskAppReady) { break } } catch {}
        Start-Sleep -Milliseconds 200
    }
    if (-not $taskAppReady) { throw 'Server could not start. See data/error.log.' }
}
if (-not $NoBrowser) { Start-Process $taskAppUrl }
