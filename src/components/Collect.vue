<template>
  <div class="boxShadow">
    <div style="margin-top: 0;">
      <h2>医嘱药品信息打印预览</h2>
      <el-table
        :data="tables1"
        height="500px"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change='selectArInfo' header-cell-class-name="cell">
        <el-table-column :label="ID" style="align-items: center" >
          <el-table-column label="序号" width="200px" type="index">
          </el-table-column>
          <template v-for='(col) in tableData1'>
            <el-table-column
              sortable
              :show-overflow-tooltip="true"
              :prop="col.dataItem"
              :label="col.dataName"
              :key="col.dataItem"
              width="183%">
            </el-table-column>
          </template>
        </el-table-column>
      </el-table>
      <!--      <el-button type="primary" round @click="collect" :disabled= "T">采集配置数据</el-button>-->
      <el-button type="primary" round @click="confirm1" :disabled=T>打印确认</el-button>
      <el-button type="primary" round @click="returnBack" :disabled=T>返回</el-button>
    </div>
  </div>

</template>

<script>
export default {

  name: 'Collect',
  data () {
    return {
      T: false,
      ID: '99',
      tables1: [],
      tableData1: [
        {
          dataItem: 'description',
          dataName: '药品信息'
        }, {
          dataItem: 'doctorId',
          dataName: '医生id'
        },
        {
          dataItem: 'patientId',
          dataName: '患者id'
        },
        {
          dataItem: 'remark',
          dataName: '备注'
        },
        {
          dataItem: 'id',
          dataName: '药品id'
        }, {
          dataItem: 'name',
          dataName: '药品名称'
        },
        {
          dataItem: 'price',
          dataName: '价格'
        }, {
          dataItem: 'priority',
          dataName: '优先级'
        }
      ]
    }
  },
  created () {
    this.getParams()
    let orderId = this.ID
    console.log(orderId)
    return this.$axios.get('/DoctorOrder/get', {params: {id: orderId}})
      .then((res) => {
        console.log(res)
        // console.log(status);
        if (res.data.status === 'success') {
          console.log('进入了成功提示代码段')
          this.$message({
            showClose: true,
            message: '申请成功',
            type: 'success'

          })
          this.tables1 = res.data.data
        } else if (res.data.status === 'false') {
          this.$message.error('已处理完所有批次')
          this.T = true
          this.tables1 = res.data.data
        } else if (res.data.status === 'fail') {
          this.$message.error('请选择')
        }
      })
      .catch((error) => {
        console.log('进入错误处理')
        this.$message.error('lyfNB')
      })
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  },

  methods: {
    // 获取表格选中时的数据
    getParams () {
      // 取到路由带过来的参数
      var routerParams = this.$route.params.id
      // 将数据放在当前组件的数据内
      this.ID = routerParams
      console.log(this.$route.params.id)
      console.log(this.ID)
    },
    selectArInfo (val) {
      this.selectArr = val
    },
    collect () {
      console.log(this.ID)
      this.T = true
      return this.$axios.get('/DoctorOrder/get', {
        DoctorID: this.ID
      })
        .then((res) => {
          this.tables1 = res.data.data
          if (res.data.status != -1) {
            this.ID = res.data.status
            disabled = true
          } else {
            this.$message({
              type: 'info',
              message: '已无需要处理的医嘱！'})
            disabled = true
          }
        })
        .catch(function (error) {
          console.log(error)
        })

        // this.tables1 = [{
        //   yaopin: '456',
        //   yongfa: '798',
        //   yongliang: '9852',
        //   jiage: '13213',
        //   beizhu: '123'
        // },
        // {
        //   yaopin: '456',
        //   yongfa: 'xxxx',
        //   yongliang: '9852',
        //   jiage: '13213',
        //   beizhu: '123'
        // }]
    },
    confirm1 () {
      this.$message({
        showClose: true,
        message: '打印成功',
        type: 'success'
      })
    },
    returnBack(){
      this.$router.push({path: '/collectTag'})
    }
  }
}
</script>

<style scoped>

</style>
