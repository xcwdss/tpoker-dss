<template>
    <div class="main">
        <h1>德州扑克游戏大厅</h1>
        <p>欢迎来到dss的德州扑克游戏大厅，祝您游戏愉快</p>
        <router-link to='/signin'>已有账号，马上登录</router-link>
        &nbsp&nbsp
        <router-link to='/register'>还没账号，现在就去注册</router-link>
    </div>
</template>
<script>

export default {
  data () {
    return {
      
    }
  },
  created:function(){
    if(sessionStorage.username){
      alert('您已登录，直接进入房间')
      this.$router.push('room')
    }
  }

}
</script>

<style scoped>
body {
  font-family: Helvetica, sans-serif;
}
.main{
  margin-top: 5%
}
</style>


