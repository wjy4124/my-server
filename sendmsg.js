const process = require('process');
const ChatBot = require('dingtalk-robot-sender');
console.info('DINGTALK_ACCESSTOKEN', process.env.DINGTALK_ACCESSTOKEN)
console.info('DINGTALK_SECRET', process.env.DINGTALK_SECRET)
const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: process.env.DINGTALK_ACCESSTOKEN,
  secret: process.env.DINGTALK_SECRET
})

robot.text('depoly ok!', {}).then(e => {
  console.log('send success')
}).catch(e => {
  console.error('send error')
})
