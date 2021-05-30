const fs = require('fs');

if (fs.existsSync('/etc/krb5.conf')) {
  fs.copyFileSync('/etc/krb5.conf', `/etc/krb5.conf.${Date.now()}.bkp`);
}

fs.writeFileSync('/etc/krb5.conf', `[libdefaults]
  default_realm = EXAMPLE.COM
  dns_canonicalize_hostname = false

[realms]
  EXAMPLE.COM = {
          kdc = localhost
          admin_server = localhost
  }
`);
