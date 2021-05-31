$ShellZipUrl = 'https://downloads.mongodb.com/windows/mongodb-shell-windows-x86_64-enterprise-4.4.6.zip'
$ShellZipPath = '.\shell.zip'
$ExtractPath = '.\shell'

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $ShellZipUrl -OutFile $ShellZipPath
Expand-Archive -Path shell.zip -DestinationPath $ExtractPath
