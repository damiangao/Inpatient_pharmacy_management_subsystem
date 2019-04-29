<template>
  <div>
    <el-button @click="jumpToApply()">申请领药</el-button>
    <el-button @click="jumpToReturn()">申请退药</el-button>
  </div>
</template>

<script>
export default {
  name: 'AllocateCtrl',
  methods: {
    jumpToApply () {
      this.$router.push({path: '/applyMedicine'})
    },
    jumpToReturn () {
      this.$router.push({path: '/returnMedicine'})
    }
  }
}
</script>

<style scoped>

</style>
