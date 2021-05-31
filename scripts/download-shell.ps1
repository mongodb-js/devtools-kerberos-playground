$Url = 'https://downloads.mongodb.com/windows/mongodb-shell-windows-x86_64-enterprise-4.4.6.zip'
$DownloadZipFile = '.\shell.zip'
$ExtractPath = ".\shell"
Invoke-WebRequest -Uri $Url -OutFile $DownloadZipFile
$ExtractShell = New-Object -ComObject Shell.Application
$ExtractFiles = $ExtractShell.Namespace($DownloadZipFile).Items()
$ExtractShell.NameSpace($ExtractPath).CopyHere($ExtractFiles)
Start-Process $ExtractPath