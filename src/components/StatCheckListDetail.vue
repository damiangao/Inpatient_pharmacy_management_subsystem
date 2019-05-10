<template>
  <el-container direction="vertical">
    <h2>盘点表详情</h2>

      <el-col>
<!--        <el-button type="primary" @click="printCheckList">打印盘点表</el-button>-->
      </el-col>

    <el-table
      :data="checkListTableDetail"
      style="width: 100%"
      max-height="800"
      stripe
      border>
      <el-table-column
        prop="drugId"
        label="药品ID"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="actualNum"
        label="实盘量"
        min-width="150">
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: 'StatCheckListDetail',
  data () {
    return {
      checkListTableDetail: []
    }
  },
  computed: {
    currentCheckListID: function () {
      console.log("记录的ID为", this.$store.state.currentCheckListID)
      return this.$store.state.currentCheckListID
    }
  },
  beforeMount: function () {
    return this.$axios.get('/checkList/getCheckDetail', {
      params: {
        id: this.currentCheckListID
      }
    })
      .then((res) => {
        console.log(this.$store.state.name)
        console.log(res.data.data)
        let data = res.data.data
        let status = res.data.status
        if (status === 'success') { // 登录成功关闭模态窗口
          this.checkListTableDetail = data
        } else if (status === 'fail') {
          this.$message.error('获取数据失败')
        }
      })
      .catch((error) => {
        console.log(this.total)
        this.$message.error(error.toString())
      })
  }
}
</script>

<style scoped>

</style>
