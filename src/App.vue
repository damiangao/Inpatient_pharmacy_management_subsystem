<template>
    <div id="app">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="300px">Aside</el-aside>
                <el-main>
                    <transition name="fade" mode="out-in">
                        <router-view/>
                    </transition>
                </el-main>
            </el-container>
            <el-footer>Footer</el-footer>
        </el-container>
        <el-dialog class="register" title="住院药房管理子系统登录" :visible.sync="dialogVisible"
                   center append-to-body lock-scroll width=500px :show-close=false :close-on-press-escape=false
                   :close-on-click-modal=false>
            <Login v-on:loginSuccess="loginSuccess"/>
        </el-dialog>
    </div>
</template>

<script>
import Login from './components/Login'

export default {
  data () {
    return {
      dialogVisible: true,
      userName: ''
    }
  },
  components: {Login},
  name: 'App',
  methods: {
    loginSuccess: function (arg) { // 监听下级组件
      this.dialogVisible = arg.dialogVisible
      this.userName = arg.userName
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
