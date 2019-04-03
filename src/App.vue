<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <el-dialog title="住院药房管理子系统登录" :visible.sync="dialogVisible" center :append-to-body='true' :lock-scroll="false" width="30%">
      <Login/>
    </el-dialog>

    <!--    <dialog ref="dialog"/>-->
  </div>
</template>

<script>
import Dialog from './components/Dialog'
import Login from './components/Login'

export default {
  data () {
    return {
      dialogVisible: true
    }
  },
  components: {Login, Dialog},
  name: 'App',
  methods: {
    // submitForm () {
    //   this.dialogTableVisible = true// 默认页面不显示为false,点击按钮将这个属性变成true
    // }
    // startHacking () {
    //   this.$notify({
    //     title: 'It works!',
    //     type: 'success',
    //     message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
    //     duration: 5000
    //   })
    // }
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
</style>
