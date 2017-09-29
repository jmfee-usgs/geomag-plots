'use strict';

var config = require('./config'),
    extend = require('extend');


var MOUNT_PATH = config.ini.MOUNT_PATH,
    OFFSITE_HOST = config.ini.OFFSITE_HOST,
    OFFSITE_PORT = config.ini.OFFSITE_PORT;


var addMiddleware = function (connect, options, middlewares) {
  middlewares.unshift(
    require('grunt-connect-rewrite/lib/utils').rewriteRequest,
    require('grunt-connect-proxy/lib/utils').proxyRequest,
    require('gateway')(options.base[0], {
      '.php': 'php-cgi',
      'env': extend({}, process.env, {
        'PHPRC': 'node_modules/hazdev-template/dist/conf/php.ini'
      })
    })
  );
  return middlewares;
};


var connect = {
  options: {
    hostname: '*'
  },

  proxies: [
    {
      context: '/theme/',
      host: 'localhost',
      port: config.templatePort,
      rewrite: {
        '^/theme': ''
      }
    },
    {
      context: '/ws/',
      host: OFFSITE_HOST,
      port: OFFSITE_PORT,
      protocol: (OFFSITE_PORT === '443' ? 'https:' : 'http:'),
      headers: {
        host: OFFSITE_HOST,
        'accept-encoding': 'identity'
      }
    }
  ],

  rules: [
    {
      from: '^' + MOUNT_PATH + '/(.*)$',
      to: '/$1'
    }
  ],

  dev: {
    options: {
      base: [
        config.build + '/' + config.src + '/htdocs'
      ],
      livereload: config.liveReloadPort,
      middleware: addMiddleware,
      open: 'http://localhost:' + config.buildPort +
          MOUNT_PATH + '/index.php',
      port: config.buildPort
    }
  },

  dist: {
    options: {
      base: [
        config.dist + '/htdocs'
      ],
      port: config.distPort,
      keepalive: true,
      open: 'http://localhost:' + config.distPort +
          MOUNT_PATH + '/index.php',
      middleware: addMiddleware
    }
  },

  example: {
    options: {
      base: [
        config.example,
        config.build + '/' + config.src + '/htdocs',
        config.etc
      ],
      middleware: addMiddleware,
      open: 'http://localhost:' + config.examplePort + '/example.php',
      port: config.examplePort
    }
  },

  template: {
    options: {
      base: [
        'node_modules/hazdev-template/dist/htdocs'
      ],
      port: config.templatePort,
      middleware: addMiddleware
    }
  },

  test: {
    options: {
      base: [
        config.build + '/' + config.src + '/htdocs',
        config.build + '/' + config.test,
        config.etc,
        'node_modules'
      ],
      port: config.testPort,
      open: 'http://localhost:' + config.testPort + '/test.html'
    }
  }
};


module.exports = connect;
