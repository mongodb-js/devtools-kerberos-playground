# USAGE

## Prerequisites

`node.js` and `docker` are required to run the tests.

Also for the first time:

1. Add host entries to /etc/hosts

``` sh
sudo npm run setup-host-entries
```

2. Setup `krb5.conf`

``` sh
sudo npm run setup-krb5-conf
```

Note: any previous `/etc/krb5.conf` will be backed up and replaced.

## Run

Start the docker setup:

``` sh
npm run start-server
```

And run the tests from a different terminal:

``` sh
npm run test
```

Use `MONGODB_SHELL_BINARY` to specify a different shell, eg:

``` sh
MONGODB_SHELL_BINARY=mongo36 npm run test
```
