<template>
    <el-container direction="vertical">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/medicationListManagement' }">摆药单管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="showPage==='medicationLists'||showPage==='medicationLists'">摆药单详情</el-breadcrumb-item>
            <el-breadcrumb-item v-if="showPage==='medicationLists'">摆药单编辑</el-breadcrumb-item>
        </el-breadcrumb>

        <!--   摆药单列表页面     -->
        <template v-if="showPage==='medicationLists'">
            <h2>摆药单列表</h2>
            <el-table
                    :data="medicationLists"
                    style="width: 100%"
                    max-height="800"
                    stripe
                    border>
                <el-table-column
                        prop="medicationListID"
                        label="摆药单ID"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="orderID"
                        label="医嘱ID"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="employeeName"
                        label="员工"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="generatedTime"
                        label="生成时间"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="120">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="showRow(scope.$index)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--   摆药单列表页面     -->

    </el-container>

</template>

<script>
export default {
  name: 'MedicationListManagement',
  data () {
    return {
      showList: true,
      examine: false,
      edit: false,
      showPage: 'medicationLists',
      medicationLists: [{
        medicationListID: '1',
        orderID: '2',
        employeeName: '3',
        generatedTime: '4'
      }, {
        medicationListID: '2',
        orderID: '2',
        employeeName: '3',
        generatedTime: '4'
      }, {
        medicationListID: '3',
        orderID: '2',
        employeeName: '3',
        generatedTime: '4'
      }, {
        medicationListID: '4',
        orderID: '2',
        employeeName: '3',
        generatedTime: '4'
      }]
    }
  },
  methods: {
    showRow: function (r) {
      this.$message.success(r.toString())
    }
  }
}
</script>

<style scoped>
    .el-breadcrumb {
        padding: 10px;
    }
</style>
