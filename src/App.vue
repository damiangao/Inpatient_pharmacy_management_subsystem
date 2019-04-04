<template>
    <div id="app">
        <el-container>
            <Header :input-name="userName"/>
            <el-container>
                <Aside/>
                <el-main>
                    <transition name="fade" mode="out-in">
<!--************************ROUTER************************-->
                        <router-view/>
<!--******************************************************-->
                    </transition>
                </el-main>
            </el-container>
            <el-footer>Footer</el-footer>
        </el-container>
        <el-dialog class="register" title="住院药房管理子系统登录" :visible.sync="dialogVisible"
                   center append-to-body lock-scroll width=500px :show-close=false :close-on-press-escape=false
                   :close-on-click-modal=false>
<!--************监听loginSuccess信号，响应函数，也可以不同名***-->
            <Login v-on:loginSuccess="loginSuccess"/>
<!--********************************************************-->
        </el-dialog>
    </div>
</template>

<script>
import Login from './components/Login'
import Header from './components/Header'
import Aside from './components/Aside'

export default {
  data () {
    return {
      dialogVisible: true, // 登录框显示
      userName: ''// 登陆成功的用户名
    }
  },
  components: {Aside, Header, Login},
  name: 'App',
  methods: {
    loginSuccess: function (args) { // 由下级组件传递的参数
      this.dialogVisible = args.dialogVisible
      this.userName = args.userName
      console.log('loginSuccess')
    }
  }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .register:only-child {
        min-width: 350px;
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
