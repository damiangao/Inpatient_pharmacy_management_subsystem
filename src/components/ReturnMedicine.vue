<template>
  <div>
    <!--输入框-->
    <el-input placeholder="请输入搜索内容" v-model="inputSearch" class="input-with-select"></el-input>

    <!--药品表-->
    <div align="center">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="myTable"
        :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          reserve-selection>
        </el-table-column>
        <el-table-column
          label="药品ID">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="药品名">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价">
        </el-table-column>
        <el-table-column label="请领数量">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.applyNums"
              controls-position="right"
              @change="handleChange()"
              :min="0"
              :max="200">
            </el-input-number>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页器-->
    <el-pagination
      small
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size= "pagesize"
      layout="prev, pager, next, total, jumper"
      :total="drugTable.length">
    </el-pagination>

    <!--提交按钮-->
    <el-button @click="handleSubmmit()">提交申请</el-button>

    <!--嵌套对话框-->
    <el-dialog title="申请详情" :visible.sync="dialogTableVisible">
      <el-table :data="multipleSelection">
        <el-table-column property="id" label="药品ID" width="150"></el-table-column>
        <el-table-column property="name" label="药品名" width="200"></el-table-column>
        <el-table-column property="applyNums" label="申请数量" width="200"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleApply();toggleSelection()">确认申请</el-button>
      </span>
    </el-dialog>

    <!--取消&返回按钮-->
    <el-button @click="toggleSelection()">取消选择</el-button>
    <el-button @click="jumpBack()">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'ApplyMedicine',
  data () {
    return {
      select: '',
      // 输入框默认为空
      inputSearch: '',
      // 默认页面
      currentPage: 1,
      // 一个页面的数据数
      pagesize: 5,
      // 选择的表项
      multipleSelection: [],
      // 显示的药品表
      drugTable: [],
      // 提交的申请表
      applyTable: [],
      // 数据加载中
      loading: true,
      // 嵌套对话框
      dialogTableVisible: false
    }
  },
  computed: {
    // 实现搜索的逻辑
    tables () {
      const search = this.inputSearch
      if (search) {
        return this.drugTable.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.drugTable
    }
  },
  methods: {
    // 表格的勾选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    // 计数器变化
    handleChange () {
      //
    },
    // 更改单页面大小的附加操作 用@size-change绑定
    handleSizeChange (val) {
      this.pagesize = val
      console.log(`每页 ${val} 条`)
    },

    // 更改显示页面的附加操作 用@current-change绑定
    handleCurrentChange: function () {
      console.log(`当前页:${this.currentPage}`)
    },

    // 返回按钮
    jumpBack () {
      this.$router.push({path: '/allocateCtrl'})
    },

    // 提交按钮
    handleSubmmit () {
      if (this.multipleSelection.length != 0) {
        for (var i in this.multipleSelection) {
          if (this.multipleSelection[i].applyNums === 0) {
            this.$message({
              showClose: true,
              message: '有药品申请数量为0，无法提交',
              type: 'error'
            })
            break
          }
          this.dialogTableVisible = true
        }
      } else {
        this.$message({
          showClose: true,
          message: '未选择任何药品，无法提交',
          type: 'error'
        })
      }
    },

    // 确认申请信息
    handleApply () {
      this.dialogTableVisible = false
      this.applyTable = JSON.stringify(
        this.multipleSelection.map(item => {
          return {drugId: item.id, num: item.applyNums}
        })
      )
      console.log(this.applyTable)
      return this.$axios.post('/allocateCtrl/applyMedicine', {
        applyTable: this.applyTable
      })
        .then((res) => {
          let status = res.data.status
          // console.log(status);
          if (status === 'success') {
            console.log('进入了成功提示代码段')
            this.$message({
              showClose: true,
              message: '申请成功',
              type: 'success'
            })
            console.log('成功提示已执行')
          } else if (status === 'refused') {
            this.$message.error('申请失败')
          }
        })
        .catch((error) => {
          console.log('进入错误处理')
          this.$message.error('lyfNB')
        })
    },

    // 取消选择按钮
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.myTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.myTable.clearSelection()
      }
      // 清空计数器
      for (var i in this.drugTable) {
        this.drugTable[i].applyNums = 0
      }
    }
  },

  // 和后端的交互
  beforeMount: function () {
    return this.$axios.get('/allocateCtrl/showDrugs', {
      params: {
        index: 1
      }
    })
      .then((res) => {
        let data = res.data.data
        let status = res.data.status
        if (status === 'success') {
          this.drugTable = data
          this.total = data.length
          this.loading = false
        } else if (status === 'fail') {
          this.$message.error('获取数据失败')
        }
      })
      .catch((error) => {
        this.$message.error(error.toString())
      })
  }
}
</script>

<style scoped>
  /*搜索框的样式*/
  .el-input{
    width: 500px;
  }
  .el-select{
    width: 100px;
  }
  /*数据表的样式*/
  .el-table{
    width: 800px;
    height: 400px;
  }
</style>
