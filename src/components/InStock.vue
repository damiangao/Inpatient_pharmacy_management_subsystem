<template>
  <el-container direction="vertical">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>入库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>入库管理</h2>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-col :span="12">
        <el-form-item label="出库单位" prop="out">
          <el-select v-model="form.out" class="el-input" filterable>
            <el-option v-for="item in outDept" :key="item.deptId" :value="item.deptId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="入库单位" prop="in">
          <el-input :value="this.$store.state.userDept" disabled></el-input>
          <!--<el-select v-model="form.in" class="el-input" filterable>
            <el-option v-for="item in inList" :key="item.deptId" :value="item.deptId" :label="item.name"></el-option>
          </el-select>-->
        </el-form-item>
      </el-col>
      <el-form ref="id" :model="id" label-width="80px" :rules="rules" @submit.native.prevent>
        <el-col :span="18">
          <el-form-item label="ID" prop="id">
            <el-input v-model.number="id.id" @keyup.enter.native.prevent="searchItem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button @click="searchItem" :loading="isSearching">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <el-form v-show="stat === 'found'" :model="found" ref="found" label-width="80px" :rules="rules">
        <el-col :span="6">
          <el-form-item label="数量" prop="num">
            <el-input v-model.number="found.num"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="药品名称">
            <el-input v-model="found.name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单价">
            <el-input v-model.number="found.price" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button @click="addItem" type="primary">添加</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <el-form v-show="stat === 'nfound'" :model="nfound" ref="nfound" label-width="80px" :rules="rules">
        <el-col :span="6">
          <el-form-item label="数量" prop="num">
            <el-input v-model.number="nfound.num"></el-input>
          </el-form-item>
        </el-col>
       <el-col :span="6">
          <el-form-item label="计量单位" prop="unit">
            <el-input v-model="nfound.unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="药品名称" prop="name">
            <el-input v-model="nfound.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单价" prop="price">
            <el-input v-model="nfound.price"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="优先级" prop="piority">
            <el-input v-model.number="nfound.piority"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="描述" prop="desc">
            <el-input type="textarea" :rows="4" v-model="nfound.desc"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-button @click="submitItem" type="primary">添加</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <el-table :data="itemList" style="width: 100%" header-cell-class-name="cell" class="el-form-item">
        <el-table-column prop="name" label="药品名称"></el-table-column>
        <el-table-column prop="id" label="药品ID"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="price" label="药品单价"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="onDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="onSubmit" type="primary">提交</el-button>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: 'inStock',
  data () {
    let validate = (rule, value, callback) => {
      if (isNaN(parseFloat(value))) {
        callback(new Error('不是数字'))
      } else {
        this.nfound.price = parseFloat(value).toFixed(2)
        callback()
      }
    }
    return {
      form: {
        out: '',
        in: this.$store.state.userDeptID,
        itemList: ''
      },
      id: {id: ''},
      isSearching: false,
      stat: 'home',
      found: {
        num: 0,
        name: '',
        price: 0
      },
      nfound: {
        num: 0,
        name: '',
        unit: '',
        price: 0,
        piority: 0,
        desc: ''
      },
      inList: [{name: 'qwe', deptId: 123}, {name: 'asd', deptId: 456}, {name: 'zxc', deptId: 789}],
      outDept: [],
      itemList: [],
      rules: {
        out: [{required: true, message: '请输入出库单位', trigger: 'blur'}],
        in: [{required: true, message: '请输入入库单位', trigger: 'blur'}],
        id: [{required: true, message: '请输入药品ID', trigger: 'blur'}],
        num: [{required: true, message: '请输入数量', trigger: 'blur'}],
        name: [{required: true, message: '请先输入名称', trigger: 'blur'}],
        unit: [{required: true, message: '请输入单位', trigger: 'blur'}],
        piority: [{required: true, message: '请输入优先级', trigger: 'blur'}],
        desc: [{required: true, message: '请输入描述', trigger: 'blur'}],
        price: [{required: true, validator: validate, trigger: 'blur'}]
      }
    }
  },
  methods: {
    searchItem () {
      this.isSearching = true
      this.$axios
        .get('/drug/get', {params: {id: this.id.id}})
        .then(res => {
          let data = res.data
          if (data.status === 'success') {
            this.stat = 'found'
            this.found.name = data.data.name
            this.found.price = data.data.price
            this.found.left = data.data.stock
            this.found.num = 0
          } else if (data.status === 'fail') {
            this.stat = 'nfound'
          }
          this.isSearching = false
        })
        .catch(err => {
          console.log(err)
          this.isSearching = false
        })
    },
    onDelete (index) {
      this.itemList.splice(index, 1)
      console.log(index)
    },
    addItem () {
      this.$refs.found.validate()
        .then(() => {
          let titem = {
            id: this.id.id,
            name: this.found.name,
            num: this.found.num,
            price: this.found.price
          }
          this.itemList.forEach(item => {
            if (item.id === titem.id) {
              item.num += titem.num
              item.sum += titem.sum
              titem = null
            }
          })
          if (titem) this.itemList.push(titem)
          this.id.id = ''
          this.found = {name: '', num: 0, price: 0, left: 0}
          this.stat = 'home'
          console.log(titem)
        })
        .catch(err => console.log(err))
    },
    submit () {
      this.$refs.nfound.validate()
        .then(() => {
          this.nfound.id = this.id.id
          this.$axios.post('/drug/add', this.nfound)
            .then(res => {
              this.$message.success(res.data.data)
              let titem = {
                id: this.id,
                name: this.nfound.name,
                num: this.nfound.num,
                price: this.nfound.price
              }
              this.itemList.forEach(item => {
                if (item.id === titem.id) {
                  item.num += titem.num
                  item.sum += titem.sum
                  titem = null
                }
              })
              if (titem) this.itemList.push(titem)
              this.id.id = ''
              this.nfound = {num: 0, name: '', unit: '', price: 0, piority: 0, desc: ''}
              this.stat = 'home'
              console.log(titem)
            })
            .catch(err => console.log(err))
        })
    },
    submitItem () {
      this.$refs.nfound.validate()
        .then(() => this.$axios.post('/drug/add', this.nfound))
        .then(() => {
          let titem = {
            id: this.id.id,
            name: this.nfound.name,
            num: this.nfound.num,
            price: this.nfound.price
          }
          this.itemList.forEach(item => {
            if (item.id === titem.id) {
              item.num += titem.num
              item.sum += titem.sum
              titem = null
            }
          })
          if (titem) this.itemList.push(titem)
          this.id.id = ''
          this.nfound = {num: 0, name: '', unit: '', price: 0, piority: 0, desc: ''}
          this.stat = 'home'
          console.log(titem)
        })
        .catch(err => console.log(err))
    },
    onSubmit () {}
  },
  created: function () {
    this.$axios
      .get('/stockout/deptlist')
      .then((res) => { this.inList = res.data.data })
      .catch(err => console.log(err))
    this.$axios
      .get('/stockout/deptlist')
      .then((res) => { this.outDept = res.data.data })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>

</style>
