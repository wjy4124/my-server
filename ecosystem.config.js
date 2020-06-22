const process = require('process')
module.exports = {
  apps : [{
    name: 'my-server',
    script: 'index.js',
    watch: process.env.NODE_ENV === 'production' ? false : '.',
    watch_delay: 1000,
    ignore_watch: ['node_modules']
  }],

  deploy : {
    production : {
      user : 'root',
      host : 'tc',
      ref  : 'origin/master',
      repo : 'git@github.com:wjy4124/mcy-server.git',
      path : '/server',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
