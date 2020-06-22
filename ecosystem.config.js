module.exports = {
  apps : [{
    name: 'my-server',
    script: 'index.js',
    watch: '.',
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
      'pre-deploy' : 'git fetch',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production && node sendmsg.js',
      'pre-setup': ''
    }
  }
};
