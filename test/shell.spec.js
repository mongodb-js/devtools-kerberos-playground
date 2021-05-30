const assert = require('assert');

const { kinit, kdestroy } = require('./helpers/kerberos');
const { buildGssapiConnectionString } = require('./helpers/connection-string');
const shell = require('./helpers/shell');

const { USER_PRINCIPAL,
  SERVER_WITH_DEFAULT_NAME,
  SERVER_WITH_ALTERNATE_NAME,
  SERVER_1_PORT,
  SERVER_1_HOST,
  EXPECTED_USER,
  USER_NAME,
  REALM
} = require('./constants');

describe('shell', () => {
  beforeEach(async() => {
    await kdestroy();
    await kinit('mongodb.user@EXAMPLE.COM', 'password');
  });

  after(async() => {
    await kdestroy();
  });

  describe('?authMechanism=GSSAPI&authSource=$external', () => {
    it('connects with a complete connection string to mongodb/ service principal', async() => {
      const user = await shell.connectAndReturnUser(
        buildGssapiConnectionString(
          USER_PRINCIPAL,
          SERVER_WITH_DEFAULT_NAME, { gssapiServiceName: 'mongodb' })
      );

      assert.deepStrictEqual(user, EXPECTED_USER);
    });

    describe('?gssapiServiceName', () => {
      it('connects with alternate service name', async() => {
        const user = await shell.connectAndReturnUser(
          buildGssapiConnectionString(
            USER_PRINCIPAL,
            SERVER_WITH_ALTERNATE_NAME,
            { gssapiServiceName: 'alternate' }
          )
        );

        assert.deepStrictEqual(user, EXPECTED_USER);
      });
    });

    describe('--gssapiServiceName', () => {
      it('connects with alternate service name', async() => {
        const user = await shell.connectAndReturnUser(
          buildGssapiConnectionString(
            USER_PRINCIPAL,
            SERVER_WITH_ALTERNATE_NAME
          ),
          '--gssapiServiceName=alternate'
        );

        assert.deepStrictEqual(user, EXPECTED_USER);
      });
    });


    describe('?authMechanismProperties', () => {
      describe('SERVICE_NAME', () => {
        it('connects with alternate service name', async() => {
          const user = await shell.connectAndReturnUser(
            buildGssapiConnectionString(
              USER_PRINCIPAL,
              SERVER_WITH_ALTERNATE_NAME,
              { authMechanismProperties: 'SERVICE_NAME:alternate' }
            )
          );

          assert.deepStrictEqual(user, EXPECTED_USER);
        });
      });

      describe('SERVICE_REALM', () => {
        it('specifies a realm if missing', async() => {
          const user = await shell.connectAndReturnUser(
            buildGssapiConnectionString(
              USER_NAME,
              SERVER_WITH_DEFAULT_NAME,
              { authMechanismProperties: `SERVICE_REALM:${REALM}` }
            )
          );

          assert.deepStrictEqual(user, EXPECTED_USER);
        });

        it('overrides only the service realm if a user already has a realm', async() => {
          const user = await shell.connectAndReturnUser(
            buildGssapiConnectionString(
              USER_PRINCIPAL,
              SERVER_WITH_DEFAULT_NAME,
              { authMechanismProperties: `SERVICE_REALM:${REALM}` }
            )
          );

          assert.deepStrictEqual(user, EXPECTED_USER);
        });
      });
    });

    describe('--gssapiHostName', () => {
      it('replaces fqdn in service principal with gssapiHostName', async() => {
        const user = await shell.connectAndReturnUser(
          buildGssapiConnectionString(
            USER_PRINCIPAL, `127.0.0.1:${SERVER_1_PORT}`),
          `--gssapiHostName=${SERVER_1_HOST}`
        );

        assert.deepStrictEqual(user, EXPECTED_USER);
      });
    });
  });
});
