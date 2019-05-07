<template>
    <el-container direction="vertical">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item @click.native.prevent="toList" :to="{ path: '/medicationHistoryList' }">摆药单管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="showPage==='list'||showPage==='detail'">摆药单详情</el-breadcrumb-item>
        </el-breadcrumb>

        <MedicationHistory v-if="showPage==='list'"/>
        <MedicationHistoryDetail v-if="showPage==='detail'"/>

    </el-container>

</template>

<script>
import MedicationHistory from './MedicationHistory'
import MedicationHistoryDetail from './MedicationHistoryDetail'

export default {
  name: 'MedicationHistoryListManagement',
  components: {MedicationHistoryDetail, MedicationHistory},
  data () {
    return {
    }
  },
  computed: {
    showPage: function () {
      return this.$store.state.historyCurrentPage
    }
  },
  methods: {
    toList: function () {
      this.$store.commit('set_historyCurrentPage', 'list')
    }
  }
}
</script>

<style scoped>
    .el-breadcrumb {
        padding: 10px;
    }
</style>
