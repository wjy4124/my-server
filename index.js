const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const {set, needLogin} = require('./common/passport')
const {COOKIE_SECRET, SESSION_SECRET, SESSION_AGE} = require('./config')

app.use(bodyParser.json())
app.use(cookieParser(COOKIE_SECRET))
app.use(session({
  secret: SESSION_SECRET,
  name: 'session',
  saveUninitialized: false,
  resave: false,
  store: new FileStore({
    path: './session',
    reapInterval: 60
  }),
  cookie: {
    originalMaxAge: SESSION_AGE * 1000
  },
  rolling: true
}))
app.use((req, res, next) => {
  res.cRes = function({code = 0, msg = 'success', data = {}} = {}) {
    this.json({
      code,
      msg,
      data
    })
  };
  next()
})
set(app)

app.get('/login', (req, res) => {
  if (req.query.name === 'wjy') {
    req.login({
      id: 1,
      name: 'wjy'
    }, e => {
      res.cRes({msg: '登录成功', data: req.session})
    })
  } else {
    res.cRes({code: 1, msg: '非法参数'})
  }
})
app.get('/logout', (req, res) => {
  req.logout()
  res.cRes({msg: '注销成功'})
})

app.use('/test', needLogin, require('./routers/test'))

let port = process.env.PORT || 3000
app.listen(port, e => {
  console.log(`listen on ${port}`)
})
