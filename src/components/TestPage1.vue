<template>
    <div>

    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-col :span="24">
                <el-form-item label="摆药单ID" prop="out">
                    <el-input v-model="form.out"></el-input>
                </el-form-item>
            </el-col>
            <h2>药品</h2>
            <div style="margin-top: 0px;">
            </div>
            <el-col :span="12">
                <el-form-item label="药品ID" prop="in">
                    <el-input v-model="form.in"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="数量">
                    <el-input v-model="item.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label='价格'>
                    <el-input v-model.number="item.num" :disabled="found"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
        <div>
            <el-button type="primary" round @click="compute">计算退款金额</el-button>
            <el-button type="primary" round @click="confirm1">确认退款</el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TestPage1'
}
</script>

<style scoped>

</style>
