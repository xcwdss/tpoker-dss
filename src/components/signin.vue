<template>
    <div class="main">
      <div>
        <h1 class="login">登录</h1>
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" >
            <el-input v-model="account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="password" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="button"  type="primary" @click="signin">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="toRegister">
          <router-link to='/register'>没有账号，前去注册</router-link>
        </div>
      </div>
    </div>
    
</template>

<script>
  export default {
    data:function(){
        return {
          account:'',
          password:''
        }
    },
    methods: {
      signin:function(){
        this.$http.post('/api/signin',{
          account:this.account,
          password:this.password
        }).then((response)=>{
          alert(response.body.msg)
          if(response.body.status===2){
            //status=2时登录成功
            sessionStorage.setItem('username',response.body.username)
            sessionStorage.setItem('seatNum',response.body.seatNum)
            //告诉客户端添加玩家
            this.$socket.emit('addPlayer',{
                seatNum:response.body.seatNum,
                username:response.body.username
            })
            this.$router.push('room')
          }//else if(response.body.status===5){
          //  alert("玩家回到游戏中")
          //  this.$router.push('room')
          //}
          else{
            alert(response.body.status)
          }
        })
      }
        
    },
    created:function(){
      //关闭网页session就被清除掉了
      if(sessionStorage.username){
        alert('您已登录，直接进入房间')
        this.$router.push('room')
      }
    }
  }
</script>
<style scoped>
div.main{
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
div.main>div{
  width: 25%;
}
h1.login{
  position: relative;
  left: 9%;
}
div.toRegister{
  display: flex;
  justify-content: flex-end;
}
.button{
    width: 100%
}
</style>
