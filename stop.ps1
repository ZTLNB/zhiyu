$ErrorActionPreference = 'Stop'
$taskAppPidPath = Join-Path $PSScriptRoot 'data\server.pid'
$taskAppExpectedExecutable = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'zhiyu.exe'))
if (Test-Path -LiteralPath $taskAppPidPath) {
    $taskAppSavedPid = [int](Get-Content -LiteralPath $taskAppPidPath)
    $taskAppRunningProcess = Get-Process -Id $taskAppSavedPid -ErrorAction SilentlyContinue
    if ($taskAppRunningProcess -and $taskAppRunningProcess.Path -eq $taskAppExpectedExecutable) { Stop-Process -Id $taskAppSavedPid }
    Remove-Item -LiteralPath $taskAppPidPath
}
