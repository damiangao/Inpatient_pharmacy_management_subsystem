<template>

  <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <el-form-item prop="account" class="item">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号" prefix-icon="el-icon-third-ziyuan23">
      </el-input>
    </el-form-item>
    <el-form-item prop="checkPass" class="item">
      <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码" prefix-icon="el-icon-third-ziyuan37">
      </el-input>
    </el-form-item>
    <el-form-item style="width:100%;" class="submit">
      <el-button class="button" type="primary" style="width:100%;" @click.native.prevent="printInput" :loading="logining">登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      logining: false,
      loginForm: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
          // { validator: validaePass }
        ],
        checkPass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
          // { validator: validaePass2 }
        ]
      },
      checked: true
    }
  },
  methods: {
    // handleReset2 () {
    //   this.$refs.loginForm.resetFields()
    // },
    // handleSubmit2 (ev) {
    //   var _this = this
    //   this.$refs.loginForm.validate((valid) => {
    //
    //   })
    // },
    printInput () {
      console.log(this.loginForm.account + '\n' + this.loginForm.checkPass)
    }
  }
}

</script>
<style>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: auto;
    width: 350px;
    padding: 15px 0px;
    background: #fff;
    /*border: 1px solid #eaeaea;*/
    /*box-shadow: 0 0 25px #cac6c6;*/
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
.submit{
  margin-top: 50px;
}
.button{
  font-size: large;
}

  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
