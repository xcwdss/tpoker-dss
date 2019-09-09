// nodejs官网实例
// const EventEmitter = require('events');
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('触发事件');
// });
// myEmitter.emit('event');
const EventEmitter = require('events')
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

module.exports=myEmitter