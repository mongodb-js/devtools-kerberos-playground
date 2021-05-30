var hostile = require('hostile');
const util = require('util');
const setHostEntry = util.promisify(hostile.set.bind(hostile));

(async () => {
  await setHostEntry('127.0.0.1', 'mongodb-krb-tests-1.example.com');
  await setHostEntry('127.0.0.1', 'mongodb-krb-tests-2.example.com');
})();
