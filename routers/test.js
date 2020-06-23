const {Router} = require('express')
const route = Router({})
const ChatBot = require('dingtalk-robot-sender');
const {DINGTALK_SECRET, DINGTALK_ACCESSTOKEN} = require('../config')
const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: DINGTALK_ACCESSTOKEN,
  secret: DINGTALK_SECRET
})
// let send = ({code = 0, msg = 'success', data = {}} = {}) => {
//   res.json({
//     code,
//     msg,
//     data
//   })
// }

route.get('/ping', (req, res) => {
  res.cRes()
})

route.get('/userinfo', async (req, res) => {
  res.cRes({data: req.user})
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
    res.cRes()
  })
  .catch(e => {
    console.info(e)
    res.cRes({code: 1, msg: 'fail', data: e})
  });
})

module.exports = route
