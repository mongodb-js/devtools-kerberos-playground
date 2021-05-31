# Source file location
$source = 'https://downloads.mongodb.com/windows/mongodb-shell-windows-x86_64-enterprise-4.4.6.zip'
$destination = '.\shell.zip'

#Download the file
Invoke-WebRequest -Uri $source -OutFile $destination