<template>
  <div class="wrap">
    <div class="header">
      <span>找房网</span>
      <span>返回首页</span>
    </div>
    <div class="content">
      <div class="main">
        <el-form ref="logForm" style="width:380px" :model="formData" :rules="rules" class="login-form">
          <div class="title">欢迎使用</div>
          <el-form-item prop="username">
            <el-input @keyup.enter.native="submit('logForm')" v-model="formData.username" placeholder="请输入系统账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" @keyup.enter.native="submit('logForm')" v-model="formData.password" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-button type="primary"  @click="submit('logForm')" style="width:100%">登录</el-button>
        </el-form>
      </div>
    </div>
    <div class="footer">
      ©2000-2007河北团结网络科技有限公司All rights reserved
    </div>
  </div>
</template>

<script>
  import { post } from '../api/api';
  import { mapActions } from 'vuex'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        formData : {
          username : '',
          password : '',
        },
        rules : {
          username : [
            {required : true,message: '请输入系统账号', trigger: 'blur'}
            
          ],
          password : [
            {required : true,message: '请输入密码', trigger: 'blur'}
          ]
        }
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
      
    },

    methods: {
      submit(formName){
        let that = this;
        that.$refs[formName].validate((valid)=>{
          if(valid){
            post('/api/login',that.formData).then((res)=>{
              if(res.code == 0){
                that.$message({
                  type : 'error',
                  message : res.msg,
                  duration : 2000,
                });
               return false; 
              }
              that.$message({
                  type : 'success',
                  message : res.msg,
                  duration : 2000,
                  onClose : dom => {
                    localStorage.setItem('routerRoles',JSON.stringify(res.roles));
                    that.$router.push('/home');
                  }
              });
            });
          }else{  
            console.log(valid)
          }
        })
      }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
.wrap{
  min-width: 1200px;
  width: 100%;
  height: 100%;
  background: #fff;
}
.header{
    margin: 0 auto;
    width: 1200px;
    min-width: 1200px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.header span:first-child{
    height: 60px;
    line-height: 60px;
    font-size: 26px;
    font-weight: 900;
    color: #3a4e7d;
}
.header span:last-child{
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #333;
}
.content{
    width: 100%;
    height: 600px;
    background: url('../assets/logBg.png') center no-repeat;
    background-size: cover;
    .main{
      position: relative;
      margin: 0 auto;
      width: 1200px;
      height: 100%;
      .login-form{
        position: absolute;
        top: 93px;
        right: 102px;
        padding: 0 30px;
        width: 320px;
        height: 400px;
        border-radius: 5px;
        background: #fff;
        .title{
          height: 106px;
          line-height: 106px;
          text-align: center;
          font-size: 26px;
          color: #108cee;
        }
      }
    }
}

.footer{
    padding-top: 36px;
    text-align: center;
    font-size: 12px;
    color: #333333;
}
</style>