<template>
  <el-container direction="vertical">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item @click.native.prevent="toList" :to="{ path: '/StatCheckListCtrl' }">盘点表管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="showPage==='checkDetail'">盘点表详情</el-breadcrumb-item>
      <el-breadcrumb-item v-if="showPage==='checkList'">盘点表列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="showPage==='checkAdd'">录入盘点表</el-breadcrumb-item>
    </el-breadcrumb>
    <StatCheckList v-if="showPage==='checkList'"/>
    <StatCheckListAdd v-if="showPage==='checkAdd'"/>
    <StatCheckListDetail v-if="showPage==='checkDetail'"/>

  </el-container>

</template>

<script>
// 子页面的组件
import StatCheckListDetail from './StatCheckListDetail'
import StatCheckListAdd from './StatCheckListAdd'
import StatCheckList from './StatCheckList'

export default {
  name: 'StatCheckListCtrl',
  // 子页面的组件
  components: {StatCheckListAdd, StatCheckListDetail, StatCheckList},
  data () {
    return {
    }
  },
  computed: {
    showPage: function () {
      return this.$store.state.checkCurrentPage
    }
  },
  methods: {
    toList: function () {
      this.$store.commit('set_checkCurrentPage', 'checkList')
    }
  }
}
</script>

<style scoped>

</style>
