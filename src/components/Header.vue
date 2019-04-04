<template>
    <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
            <span class="el-dropdown-link">
             <i class="el-icon-third-ziyuan23" style="margin-right: 15px"></i>
             {{inputName}}
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    inputName: String,
    required: true
  },
  methods: {
    // 注销用户
    logout: function () {
      console.log('logout')
    }
  }
}
</script>

<style scoped>

</style>
