<template>
    <el-container direction="vertical">
        <h2>摆药单详情</h2>
        <el-row :gutter="30">
            <el-col :span="1" :offset="17">
                <el-button type="primary" @click="dialogVisible = true">打印摆药单</el-button>
            </el-col>
            <el-col :span="1" :offset="2">
                <el-button type="primary" @click.native.prevent="check">确认摆药完成</el-button>
            </el-col>
        </el-row>
        <div>
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
        </div>
        <div id="baiyaodan">
          <el-dialog
            :visible.sync="dialogVisible"
            :center="true">
            <el-container direction="vertical">
              <el-row :gutter="20">
                <el-col :span="8" :offset="10"><h2>摆药单</h2></el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="end">
                <el-col :span="6"><div>摆药单ID: {{currentMedicationID}}</div></el-col>
                <el-col :span="6"><div>医嘱: {{medicalOrderId}}</div></el-col>
              </el-row>
              <el-table
              :data="medicineTableDetail"
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
              <el-row :gutter="20">
                <el-col :span="6"><div>日期: {{curDate}}</div></el-col>
                <el-col :span="6" :offset="12"><div>员工ID: {{userName}}</div></el-col>
              </el-row>
            </el-container>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible=false">确认</el-button>
            </span>
          </el-dialog>

        </div>
    </el-container>
</template>

<script>
// import JsPDF from 'jspdf'
// import html2Canvas from 'html2canvas'
export default {
  name: 'MedicationDetail',
  data () {
    return {
      medicineTableDetail: [],
      dialogVisible: false
    }
  },
  computed: {
    currentMedicationID: function () {
      return this.$store.state.currentMedicationID
    },
    medicalOrderId: function () {
      return this.$store.state.medicalOrderID
    },
    userName: function () {
      return this.$store.state.name
    },
    curDate: function () {
      let date  = new Date();
      let separator = "/";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let currentDate = year + separator + month + separator + day;
      return currentDate;
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
    check: function () {
      this.$confirm('是否确认摆药？')
        .then(() => {
          this.submit()
          // this.$store.commit('set_medCurrentPage', 'list')
        })
        .catch(() => {})
    },
    submit: function () {
      return this.$axios.get('/medicinetable/tableprocessed', {
        params: {
          id: this.currentMedicationID
        }
      })
        .then((res) => {
          let status = res.data.status
          if (status === 'success') { // 登录成功关闭模态窗口
            this.$message.success('确认成功')
            console.log('这行没问题1')
            this.$store.commit('set_medCurrentPage', 'list')
            console.log('这行没问题2')
            console.log('this.$store.state.medCurrentPage = ' + this.$store.state.medCurrentPage)
          } else if (status === 'fail') {
            this.$message.error('确认失败')
          }
        })
        .catch((error) => {
          console.log(this.total)
          this.$message.error(error.toString())
        })
    }
  }
}
</script>

<style scoped>

</style>
