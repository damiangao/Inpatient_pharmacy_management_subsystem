<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-col :span="12">
      <el-form-item label="出库单位">
        <el-input v-model="form.out"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="入库单位">
        <el-input v-model="form.in"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item label="药品名称">
        <el-input v-model="item.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item label="ID">
        <el-input v-model="item.id"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item>
        <el-button @click="searchItem" :loading="isSearching">查询</el-button>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label='数量'>
        <el-input v-model="item.num"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7">
      <el-form-item label='单价'>
        <el-input v-model="item.price" :disabled="true"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7">
      <el-form-item label='总价'>
        <el-input v-model="itemSum" :disabled="true"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item>
        <el-button @click="addItem">添加</el-button>
      </el-form-item>
    </el-col>
    <el-table :data="itemList" style="width: 100%" header-cell-class-name="cell" class="el-form-item">
      <el-table-column prop="name" label="药品名称"></el-table-column>
      <el-table-column prop="id" label="药品ID"></el-table-column>
      <el-table-column prop="num" label="数量"></el-table-column>
      <el-table-column prop="price" label="药品单价"></el-table-column>
      <el-table-column prop="sum" label="总价"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form-item label="创建时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'OutStock',
  data () {
    return {
      isSearching: false,
      form: {
        out: '',
        in: '',
        date1: '',
        date2: '',
        itemList: ''
      },
      item: {
        name: '',
        id: '',
        num: 0,
        price: 0
      },
      itemList: []
    }
  },
  computed: {
    itemSum: function () {
      return this.item.price * this.item.num
    }
  },
  methods: {
    onSubmit () {
      this.form.itemList = JSON.stringify(this.itemList)
      console.log(this.itemList)
      console.log(this.form)
    },
    onDelete (index) {
      this.itemList.splice(index, 1)
      console.log(index)
    },
    addItem: function () {
      let titem = {}
      titem.id = this.item.id
      titem.name = this.item.name
      titem.num = Number(this.item.num)
      titem.price = Number(this.item.price)
      titem.sum = this.itemSum
      this.itemList.forEach(item => {
        if (item.id === titem.id) {
          item.num += titem.num
          item.sum += titem.sum
          titem = null
        }
      })
      if (titem) this.itemList.push(titem)
      console.log(titem)
    },
    searchItem () {
      this.isSearching = true
      if (this.item.name === '123') { this.item.id = 456; this.item.price = 1 } else { this.item.id = 789; this.item.price = 2 }
    }
  }
}
</script>

<style scoped>

</style>
