const express = require('express')
const app = express()
const process = require('process')
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
const ChatBot = require('dingtalk-robot-sender');
const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: '57d8b3f4ba6cfdb95a8bff0a3add84b5a725728a43a4bc450d6b9009e0fad71b',
  secret: 'SEC7ae5bc6e001cf7f71f2f294746e4e14e345d98bc161e9281815b25f8f0effca7'
})

let send = (res, {code = 0, msg = 'success', data = {}} = {}) => {
  res.json({
    code,
    msg,
    data
  })
}
app.use((req, res, next) => {
  next()
})
app.use(bodyParser.json())
app.get('/test', (req, res) => {
  send(res)
})
app.get('/mail', async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    console.info('test')
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    console.info('created')
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"Fred Foo 👻"', // sender address
      to: "wjy4124@qq.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    send(res)
  } catch (e) {
    send(res, {code: 1, msg: 'failed', data: e})
  }
})
app.get('/mail', async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    console.info('test')
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    console.info('created')
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"Fred Foo 👻"', // sender address
      to: "wjy4124@qq.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    send(res)
  } catch (e) {
    send(res, {code: 1, msg: 'failed', data: e})
  }
})
app.get('/ding', (req, res) => {
  let textContent = {
    "msgtype": "text",
    "text": {
      "content": "我就是我, 是不一样的烟火"
    },
    "at": {
      "atMobiles": [
        "18520125792"
      ],
      "isAtAll": false
    }
  }
  // robot.send(textContent)
  let card = {
    "title": "乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
    "text": `![screenshot](@lADOpwk3K80C0M0FoA) 
                ### 乔布斯 20 年前想打造的苹果咖啡厅 
                Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`,
    "hideAvatar": "1",
    "btnOrientation": "0",
    "btns": [
      {
        "title": "内容不错",
        "actionURL": "https://www.baidu.com/"
      },
      {
        "title": "不感兴趣",
        "actionURL": "https://www.dingtalk.com/"
      }
    ]
  };
  robot.actionCard(card)
    .then((e) => {
      // TODO
      send(res)
    })
    .catch(e => {
      console.info(e)
      send(res, {code: 1, msg: 'fail', data: e})
    });
})

let port = process.env.PORT || 3000
app.listen(port, e => {
  console.log(`listen on ${port}`)
})
