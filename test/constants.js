const REALM='EXAMPLE.COM';
const USER_NAME='mongodb.user';
const USER_PRINCIPAL = `${USER_NAME}@${REALM}`;
const SERVER_1_HOST = 'mongodb-krb-tests-1.example.com';
const SERVER_1_PORT = '29017';
const SERVER_WITH_DEFAULT_NAME = `${SERVER_1_HOST}:${SERVER_1_PORT}`;
const SERVER_2_HOST = 'mongodb-krb-tests-2.example.com';
const SERVER_2_PORT = '29018';
const SERVER_WITH_ALTERNATE_NAME = `${SERVER_2_HOST}:${SERVER_2_PORT}`;
const EXPECTED_USER = Object.freeze({ user: USER_PRINCIPAL, db: '$external' });

module.exports = {
  REALM,
  USER_NAME,
  USER_PRINCIPAL,
  SERVER_1_HOST,
  SERVER_1_PORT,
  SERVER_WITH_DEFAULT_NAME,
  SERVER_WITH_ALTERNATE_NAME,
  EXPECTED_USER
};
