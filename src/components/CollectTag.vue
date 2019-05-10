<template>
  <el-container direction="vertical">
    <h2>医嘱列表</h2>
    <el-table
      :data="DoctorOrderList"
      style="width: 100%"
      max-height="675"
      stripe
      border>

      <el-table-column
        prop="id"
        label="医嘱ID"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="medicineUsed"
        label="使用药品"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="totalBatch"
        label="总计批次"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="currentBatch"
        label="当前批次"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="doctorRemarks"
        label="医生备注"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="doctorId"
        label="医生id"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="patientId"
        label="患者id"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="120">
        <template slot-scope="scope">
          <!--       //   <el-button @click.native.prevent="collect(scope.$index)" type="text" size="small">采集</el-button>-->
          <el-button type="text" @click="collect(scope.$index)" >打印对应标签</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>

</template>

<script>
export default {

  name: 'CollectTag',
  data () {
    return {
      DoctorOrderList: [{
        id: 123

      },
      {
        id: 123

      }
      ]
    }
  },
  created: function () {
    return this.$axios.post('/DoctorOrder/getList')
      .then((res) => {
        console.log(res)
        let status = res.data.status
        // console.log(status);
        if (status === 'success') {
          console.log('进入了成功提示代码段')
          this.$message({
            showClose: true,
            message: '申请成功',
            type: 'success'
          })
          this.DoctorOrderList = res.data.data
        } else if (status === 'false') {
          this.$message.error(JSON.stringify(res.data.data) + '已过期')
        } else if (status === 'fail') {
          this.$message.error(JSON.stringify(res.data.data) + '已过期')
        }
      })
      .catch((error) => {
        console.log('进入错误处理')
        this.$message.error('lyfNB')
      })
  },

  methods: {
    // 获取表格选中时的数据
    collect (index) {
      this.$confirm('确认采集, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '处理成功!'
        })
        this.$router.push({name: 'Collect',
          params: {
            id: this.DoctorOrderList[index].id
            // id : this.id
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消成功！'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
