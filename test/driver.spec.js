const assert = require('assert');

const { kinit, kdestroy } = require('./helpers/kerberos');
const { buildGssapiConnectionString } = require('./helpers/connection-string');
const driver = require('./helpers/driver');

const { USER_PRINCIPAL,
  SERVER_WITH_DEFAULT_NAME,
  SERVER_WITH_ALTERNATE_NAME,
  EXPECTED_USER,
  USER_NAME,
  REALM
} = require('./constants');

describe('driver', () => {
  beforeEach(async() => {
    await kdestroy();
    await kinit('mongodb.user@EXAMPLE.COM', 'password');
  });

  after(async() => {
    await kdestroy();
  });

  describe('?authMechanism=GSSAPI&authSource=$external', () => {
    it('connects with a complete connection string to mongodb/ service principal', async() => {
      const user = await driver.connectAndReturnUser(
        buildGssapiConnectionString(
          USER_PRINCIPAL,
          SERVER_WITH_DEFAULT_NAME
        )
      );

      assert.deepStrictEqual(user, EXPECTED_USER);
    });

    describe('?gssapiServiceName', () => {
      it('is not supported anymore', async() => {
        const error = await driver.connectAndReturnUser(
          buildGssapiConnectionString(
            USER_PRINCIPAL,
            SERVER_WITH_ALTERNATE_NAME,
            { gssapiServiceName: 'alternate' }
          )
        ).catch(err => err);

        assert.strictEqual(error.message, 'option gssapiservicename is not supported');
      });
    });

    describe('?authMechanismProperties', () => {
      describe('SERVICE_NAME', () => {
        it('connects with alternate service name', async() => {
          const user = await driver.connectAndReturnUser(
            buildGssapiConnectionString(
              USER_PRINCIPAL,
              SERVER_WITH_ALTERNATE_NAME,
              { authMechanismProperties: 'SERVICE_NAME:alternate' }
            )
          );

          assert.deepStrictEqual(user, EXPECTED_USER);
        });
      });

      describe('gssapiServiceName', () => {
        it('is not supported in authMechanismProperties', async() => {
          const errorOrUser = await driver.connectAndReturnUser(
            buildGssapiConnectionString(
              USER_PRINCIPAL,
              SERVER_WITH_ALTERNATE_NAME,
              { authMechanismProperties: 'gssapiServiceName:alternate' }
            )
          ).catch(err => err);

          assert.ok(errorOrUser instanceof Error);
        });
      });

      describe('SERVICE_REALM', () => {
        it('specifies a realm if missing', async() => {
          const user = await driver.connectAndReturnUser(
            buildGssapiConnectionString(
              USER_NAME,
              SERVER_WITH_DEFAULT_NAME,
              { authMechanismProperties: `SERVICE_REALM:${REALM}` }
            )
          );

          assert.deepStrictEqual(user, EXPECTED_USER);
        });

        // NOTE: this would require a cross-realm setup to be tested properly
        it('overrides only the service realm if a user already has a realm', async() => {
          const user = await driver.connectAndReturnUser(
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
  });
});
