<template>
  <el-container direction="vertical">
    <h2>盘点表列表</h2>
    <el-col>
      <el-button @click.native.prevent="addCheckList()" size="big">录入新盘点表</el-button>
    </el-col>
    <el-table
      :data="checkLists.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      max-height="675"
      stripe
      border>
      <el-table-column
        prop="id"
        label="盘点表ID"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="盘点时间"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="盘点人员"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showDetail(scope.$index)" type="text" size="small">详情</el-button>
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
  name: 'StatCheckList',
  data () {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 5,
      checkLists: []
    }
  },
  methods: {
    showDetail: function (index) {
      let ID = this.checkLists[(this.currentPage-1) * this.pageSize + index].id
      console.log("设置盘点ID为："+ID)
      this.$store.commit('set_currentCheckListID', ID)
      this.$store.commit('set_checkCurrentPage', 'checkDetail')
    },
    addCheckList: function () {
      this.$store.commit('set_checkCurrentPage', 'checkAdd')
    },
    handleCurrentChange: function () {
      console.log(`当前页:${this.currentPage}`)
    //   return this.$axios.get('/checkList/getChecklist', {
    //     params: {
    //       index: index
    //     }
    //   })
    //     .then((res) => {
    //       let data = res.data.data
    //       let status = res.data.status
    //       if (status === 'success') {
    //         this.checkLists = data.list
    //         this.total = data.total
    //       } else if (status === 'fail') {
    //         this.$message.error('获取数据失败')
    //       }
    //     })
    //     .catch((error) => {
    //       this.$message.error(error.toString())
    //     })
    // }
    },
  },
  beforeMount: function () {
    return this.$axios.get('/checkList/getCheckList')
      .then((res) => {
        console.log(res.data.data)
        let data = res.data.data
        let status = res.data.status
        if (status === 'success') { // 登录成功关闭模态窗口
          this.checkLists = data
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

