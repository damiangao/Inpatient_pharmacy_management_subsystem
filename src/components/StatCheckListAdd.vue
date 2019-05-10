<template>
  <el-container direction="vertical">
    <h2>新盘点表</h2>
    <el-col>
      <el-button @click.native.prevent="addCheckList()" size="large">保存盘点信息</el-button>
    </el-col>
    <el-table
      :data="stockList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      max-height="675"
      stripe
      border>
      <el-table-column
        prop="id"
        label="药品ID"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="实盘数量"
        min-width="150">
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            v-model="scope.row.stock"
            controls-position="right"
            :min="0"
            :max="200">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="pagination">-->
    <el-pagination
      small
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, total, jumper"
      :total="total">
    </el-pagination>
    <!--</div>-->

  </el-container>
</template>

<script>
export default {
  name: 'StatCheckListAdd',
  data () {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 5,
      stockList: [] // 先是数据库里的数量，之后返回
    }
  },
  methods: {
    addCheckList: function () {
      return this.$axios.post('/checkList/addCheckTable',{
        checkTable: JSON.stringify(this.stockList),
        createUser: 1,// 应该要id this.$store.state.name
      })
        .then((res) => {
          let status = res.data.status;
          // console.log(status);
          if (status === 'success') {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
            console.log("成功提示已执行")
            this.$store.commit('set_checkCurrentPage', 'checkList')
          } else if (status === 'refused') {
            this.$message.error('申请失败')
          }
        })
        .catch((error) => {
          console.log("进入错误处理");
          // TypeError: Cannot read property '$message' of undefined
          this.$message.error("lyfNB")
        })
    },
    handleCurrentChange: function () {
      console.log(`当前页:${this.currentPage}`)
    },
  },
  beforeMount: function () {
    return this.$axios.get('/checkList/getStockTable')
      .then((res) => {
        console.log('接受到的药品库存表' + JSON.stringify(res.data.data))
        let data = res.data.data
        let status = res.data.status
        if (status === 'success') { // 登录成功关闭模态窗口
          this.stockList = data
          this.total = data.length
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
  .pagination{
    margin-top: 30px;
  }
</style>
