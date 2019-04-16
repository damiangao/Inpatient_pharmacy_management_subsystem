<template>
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2']" router>

            <el-submenu index="1">
                <template slot="title"><i class="el-icon-info"></i>基本信息维护</template>
                <el-menu-item index="medicationListManagement">摆药单管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>系统</template>
                <el-menu-item index="main">主页</el-menu-item>
                <el-menu-item-group>
                    <template slot="title">药品调拨</template>
                    <el-menu-item index="outStock">出库</el-menu-item>
                </el-menu-item-group>
              <el-menu-item index="collectTag">采集配置</el-menu-item>
              <el-menu-item index="returnDrug">退药申请</el-menu-item>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="test1">test1</el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
  name: 'Aside'
}
</script>

<style scoped>

</style>
