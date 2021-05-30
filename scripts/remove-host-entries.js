var hostile = require('hostile');
const util = require('util');
const removeHostEntry = util.promisify(hostile.remove.bind(hostile));

(async () => {
  await removeHostEntry('127.0.0.1', 'mongodb-krb-tests-1.example.com');
  await removeHostEntry('127.0.0.1', 'mongodb-krb-tests-2.example.com');
})();

