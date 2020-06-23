const {Router} = require('express')
const route = Router({})
const nodemailer = require("nodemailer");
const ChatBot = require('dingtalk-robot-sender');
const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: process.env.DINGTALK_ACCESSTOKEN,
  secret: process.env.DINGTALK_SECRET
})


// let send = ({code = 0, msg = 'success', data = {}} = {}) => {
//   res.json({
//     code,
//     msg,
//     data
//   })
// }

route.get('/ping', (req, res) => {
  res.customRes()
})

route.get('/mail', async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
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
    res.customRes()
  } catch (e) {
    res.customRes({code: 1, msg: 'failed', data: e})
  }
})

route.get('/ding', (req, res) => {
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
    res.customRes()
  })
  .catch(e => {
    console.info(e)
    res.customRes({code: 1, msg: 'fail', data: e})
  });
})

module.exports = route
