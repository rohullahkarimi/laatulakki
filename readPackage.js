const pkg = require('read-pkg-up');
const { readPackageUpSync } = pkg.sync();

module.exports = readPackageUpSync;
