module.exports = {
  apps : [{
    name: 'my-server',
    script: 'index.js',
    watch: '.',
    watch_delay: 1000,
    ignore_watch: ['node_modules']
  }],

  deploy : {
    test : {
      user : 'root',
      host : 'tc',
      ref  : 'origin/master',
      repo : 'https://github.com/wjy4124/my-server.git',
      path : '/server',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env test',
      'pre-setup': ''
    }
  }
};
