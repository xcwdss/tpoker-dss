cd I:\program files\MongoDB\Server\4.0\bin
mongod --dbpath=C:\Users\dss\Desktop\前端实例\my-project\tpoker-dss\tpoker-dss\db --port=28017

1、vue-resource
/*引入Vue框架*/
import Vue from 'vue'
/*引入资源请求插件*/
import VueResource from 'vue-resource'
/*使用VueResource插件*/
Vue.use(VueResource)

可以在全局vue对象上或者某个实例使用HTTP
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

// 在一个Vue实例内使用$http
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

2.body-parser
// body-parser是非常常用的一个express中间件，作用是对post请求的请求体进行解析。使用非常简单，以下两行代码已经覆盖了大部分的使用场景
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//一个接受form请求，一个接受json请求，解析的规则不一样

3.钩子
// beforecreate : 举个栗子：可以在这加个loading事件 
// created ：在这结束loading，还做一些初始化，实现函数自执行 
// mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
// beforeDestory： 你确认删除XX吗？ destoryed ：当前组件已被删除，清空相关内容

4.vue使用element-ui的el-input监听不了键盘事件，
// 原因应该是element-ui自身封装了一层div在input标签外面，把原来的事件隐藏了，所以要加.native，如@keyup.enter.native="sendMsg"

5.
// webpack 大部分是 vue-cli 自动生成的，添加了让前后端http请求都转到node的3000端口，而不是前端的8080端口的配置。

devServer: {
    historyApiFallback: true,
    noInfo: true,

    //让前后端http请求都转到node的3000端口，而不是前端的8080端口
    proxy: {
      '/': {
        target: 'http://localhost:3000/'
      }
    }
  }

6.// vue中methods一个方法调用另外一个方法，如test(),需要
this.$options.methods.test()

7.滚动条
// 在CSS中设置，得到滚动条
div{
  overflow:auto;
}
// 设置滚动的距离，使滚动条位于底部
showMsgDiv.scrollTop = 9999;