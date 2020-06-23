const passport = require('passport')

module.exports = {
  set: function(app) {
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))
    app.use(passport.initialize({}))
    app.use(passport.session())
  },
  needLogin(req, res, next) {
    req.isAuthenticated() ? next() : res.cRes({code: 1, msg: '请登录'})
  }
}
