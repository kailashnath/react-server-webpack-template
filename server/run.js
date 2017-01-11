require('babel-core/register');
require('css-modules-require-hook')(require('../etc/cmrh.conf.js'));
require('css-modules-require-hook/preset');
require('./server');
