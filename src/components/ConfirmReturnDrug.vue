<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="患者">
      <el-input v-model="form.name" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="医生">
      <el-input v-model="form.doc" :disabled="true"></el-input>
    </el-form-item>
    <h2>药品信息</h2>
    <el-table
      :data="tables1"
      height="300px"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change='selectArInfo' header-cell-class-name="cell">
      <el-table-column label="药品信息" style="align-items: center" >
        <el-table-column label="序号" width="200px" type="index">
        </el-table-column>
        <template v-for='(col) in tableData1'>
          <el-table-column
            sortable
            :show-overflow-tooltip="true"
            :prop="col.dataItem"
            :label="col.dataName"
            :key="col.dataItem"
            width="365%">
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" round @click="print1">确认打印</el-button>
    <el-button type="primary" round @click="returnBack">返回</el-button>
  </el-form>
</template>
<script>
export default {
  name: 'TestPage3',
  data () {
    return {
      form: {
        name: '123',
        doc: '123',
        id: '0002',
        medicine: '藿香正气',
        num: '10',
        price: '100'
      },
      tables1: [],
      tableData1: [
        {
          dataItem: 'price',
          dataName: '药品总价'
        }, {
          dataItem: 'num',
          dataName: '药品数目'
        },
        {
          dataItem: 'name',
          dataName: '药品名称'
        },
        {
          dataItem: 'id',
          dataName: '药品id'
        }
      ]
    }
  },
  created: function () {
    return this.$axios.post('/refund/confirm')
      .then((res) => {
        console.log(res)
        let status = res.data.status
        // console.log(status);
        if (status === 'success3') {
          console.log('进入了成功提示代码段')
          this.$message({
            showClose: true,
            message: '申请成功',
            type: 'success'
          })
          console.log(res.data.data.doctorId)
          this.form.name = res.data.data.patientId
          this.form.doc = res.data.data.doctorId
          this.tables1 = res.data.data.drugReturns
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
    onSubmit () {
      console.log('submit!')
    },

    //   let confirm = 1
    //   return this.$axios.post('/refund/confirm', confirm)
    //     .then((res) => {
    //       console.log(res)
    //       let status = res.data.status
    //       // console.log(status);
    //       if (status === 'success1') {
    //         console.log('进入了成功提示代码段')
    //         this.$message({
    //           showClose: true,
    //           message: '申请成功',
    //           type: 'success'
    //         })
    //         this.$router.push('/ConfirmReturnDrug')
    //         console.log('成功提示已执行')
    //       } else if (status === 'fail') {
    //         this.$message.error(JSON.stringify(res.data.data)+"已过期")
    //       }else if (status === 'fail') {
    //         this.$message.error(JSON.stringify(res.data.data)+"已过期")
    //       }
    //     })
    //     .catch((error) => {
    //       console.log('进入错误处理')
    //       this.$message.error('lyfNB')
    //     })
    // },
    returnBack(){
      this.$router.push({path: '/medicationHistoryList'})
    },
    print1 () {
      return this.$axios.post('/refund/getTwo')
        .then((res) => {
          console.log(res)
          let status = res.data.status
          // console.log(status);
          if (status === 'success2') {
            console.log('进入了成功提示代码段')
            this.$message({
              showClose: true,
              message: '申请成功',
              type: 'success'
            })
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
      console.log('123')
      this.$confirm('确认打印, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '打印成功!'
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
