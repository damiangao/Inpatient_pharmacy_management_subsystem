<template>
    <el-container direction="vertical">
        <h2>历史摆药单详情</h2>
        <el-table
                :data="medicineTableDetail"
                style="width: 100%"
                max-height="800"
                stripe
                border>
            <el-table-column
                    prop="drug.id"
                    label="药品ID"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="drug.name"
                    label="药品名称"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="dose"
                    label="剂量"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="drug.unit"
                    label="单位"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="drug.price"
                    label="单价"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="drug.description"
                    label="药品描述"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="医嘱信息"
                    min-width="150">
            </el-table-column>
        </el-table>
      <el-button @click="onReturn" type="primary">返回</el-button>
    </el-container>
</template>

<script>
export default {
  name: 'MedicationHistoryDetail',
  data () {
    return {
      medicineTableDetail: []
    }
  },
  computed: {
    currentMedicationID: function () {
      return this.$store.state.currentHistoryID
    }
  },
  beforeMount: function () {
    return this.$axios.get('/medicinetable/detail', {
      params: {
        id: this.currentMedicationID
      }
    })
      .then((res) => {
        let data = res.data.data
        let status = res.data.status
        if (status === 'success') { // 登录成功关闭模态窗口
          this.medicineTableDetail = data
        } else if (status === 'fail') {
          this.$message.error('获取数据失败')
        }
      })
      .catch((error) => {
        console.log(this.total)
        this.$message.error(error.toString())
      })
  },
  methods: {
    onReturn () {
      this.$store.commit('set_historyCurrentPage', 'list')
    }
  }
}
</script>

<style scoped>

</style>
