<template>
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2']" router="true">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>测试页</template>
                <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <router-link to="/test1"><el-menu-item index="1-1-1">test1</el-menu-item></router-link>
                    <router-link to="/test2"><el-menu-item index="1-1-2">test2</el-menu-item></router-link>
                    <router-link to="/helloworld"><el-menu-item index="1-1-3">helloworld</el-menu-item></router-link>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="test1">test1</el-menu-item>
                  <el-menu-item index="1-2-2" route="test2">test2</el-menu-item>
                  <router-link to="/helloworld"><el-menu-item index="1-1-3">helloworld</el-menu-item></router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>系统</template>
                <el-menu-item index="home">主页</el-menu-item>
                <el-menu-item-group>
                    <template slot="title">药品调拨</template>
                    <el-menu-item index="outStock">出库</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项4-1</el-menu-item>
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
