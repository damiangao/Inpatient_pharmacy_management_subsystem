<template>
  <el-container direction="vertical">
    <h2>退药</h2>
    <el-row :gutter="20">
      <el-col :span="2">
        <el-button type="primary" @click.native.prevent="check">确认退药</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="medicineTableDetail"
      style="width: 100%"
      max-height="800"
      stripe
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        reserve-selection>
      </el-table-column>
      <el-table-column
        prop="drug.id"
        label="药品ID"
        min-width="50">
      </el-table-column>
      <el-table-column
        prop="drug.name"
        label="药品名称"
        min-width="80">
      </el-table-column>
      <el-table-column label="当前可退数量">
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            v-model="scope.row.currentNum"
            controls-position="right"
            @change="handleChange()"
            :min="0"
            :max="scope.row.max">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="drug.unit"
        label="单位"
        min-width="50">
      </el-table-column>
      <el-table-column
        prop="drug.price"
        label="单价"
        min-width="50">
      </el-table-column>
      <el-table-column
        prop="drug.description"
        label="药品描述"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="description"
        label="医嘱信息"
        min-width="50">
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: 'MedicationReturn',
  data () {
    return {
      medicineTableDetail: [],
      maxnum: []
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
          console.log(data)
          this.medicineTableDetail.forEach((item) => { item.max = item.currentNum })
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    check () {
      var flag = 1;
      if (this.multipleSelection.length != 0) {
        for (var i in this.multipleSelection) {
          if (this.multipleSelection[i].currentNum === 0) {
            this.$message({
              showClose: true,
              message: '有药品申请数量为0，无法提交',
              type: 'error'
            });
            flag = 0;
            break;
          }
          //this.dialogTableVisible = true;
        }

      }
      if(flag === 1){
        let returnTable = {
          table: JSON.stringify(
            this.multipleSelection.map(item => {
              return {drugId: item.id - 3, num: item.currentNum, ID: this.currentMedicationID}
            })
          )
        }
        console.log(returnTable)
        return this.$axios.post('/refund/get', returnTable)
          .then((res) => {
            console.log(res)
            let status = res.data.status
            // console.log(status);
            if (status === 'success1') {
              console.log('进入了成功提示代码段')
              this.$message({
                showClose: true,
                message: '申请成功',
                type: 'success'
              })
              this.$router.push('/ConfirmReturnDrug')
              console.log('成功提示已执行')
            } else if (status === 'false') {
              this.$message.error('已过期,无法退药')
            } else if (status === 'fail') {
              this.$message.error('请选择')
            }
          })
          .catch((error) => {
            console.log('进入错误处理')
            this.$message.error('lyfNB')
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
