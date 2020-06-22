const ChatBot = require('dingtalk-robot-sender');
const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: process.env.DINGTALK_ACCESSTOKEN,
  secret: process.env.DINGTALK_SECRET
})

robot.text('depoly ok!', {})
