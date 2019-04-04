<template>

    <el-form :model="loginForm" :rules="rules2" class="demo-ruleForm login-container" label-position="left"
             label-width="0px"
             ref="loginForm">
        <el-form-item class="item" prop="account">
            <el-input auto-complete="off" placeholder="账号" prefix-icon="el-icon-third-ziyuan23" type="text"
                      v-model="loginForm.account">
            </el-input>
        </el-form-item>
        <el-form-item class="item" prop="checkPass">
            <el-input auto-complete="off" placeholder="密码" prefix-icon="el-icon-third-ziyuan37" type="password"
                      v-model="loginForm.checkPass">
            </el-input>
        </el-form-item>
        <el-form-item class="submit" style="width:100%;">
            <el-button :loading="logining" @click.native.prevent="cancel" class="button" style="width:100%;"
                       type="primary">登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import md5 from 'js-md5' // 引用md5加密
export default {
  name: 'Login',
  data () {
    return {
      logining: false,
      loginForm: {
        account: '',
        checkPass: ''
      },
      // 输入规则
      rules2: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      checked: true
    }
  },
  methods: {
    // 登录
    login: function () {
      let _this = this
      return this.$axios.post('/account/login', {
        account: this.loginForm.account,
        encryptPassword: this.encrypt(this.loginForm.checkPass)
      })
        .then(function (response) {
          console.log(response)
          if (response.data.status === 'success') { // 登录成功关闭模态窗口
            let arg = {
              dialogVisible: false,
              userName: response.data.name
            }
            _this.$emit('loginSuccess', arg)// 向上级组件发送数据
          }
        })
        .catch(function (error) { // 登陆失败
          console.log(error)
        })
    },
    printInput: function () {
      console.log(this.loginForm.account + '\n' + this.loginForm.checkPass)
    },
    encrypt (password) {
      return md5(password)
    },
    cancel: function () {
      let _this = this

      let args = {
        dialogVisible: false,
        userName: 'admin'
      }
      _this.$emit('loginSuccess', args)// 向上级组件发送数据

      console.log('cancel')
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

    .submit {
        margin-top: 50px;
    }

    .button {
        font-size: large;
    }

    .remember {
        margin: 0px 0px 35px 0px;
    }
</style>
