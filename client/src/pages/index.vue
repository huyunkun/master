<template>
<div>
    <img class="topImg" src="../assets/3.jpg" />
    <Table class="indexTable" :Data="tableData" />
    <el-button class="add" @click.native="add">添加</el-button>
</div>
    
</template>
<script>
import {jsonToForm} from '../public/public'
import Table from "../components/table";
import {getV1Group} from '../api/api'
export default {
  components: {
    Table
  },
  data() {
    return {
      tableData: []
    };
  },
  methods:{
    jsonToForm:jsonToForm,
    add(){
      this.$router.push({
              path:'/add'
          })
    }
  },
  mounted(){
      let userdata = {
        userName:sessionStorage.getItem('userName')
      }
      userdata = this.jsonToForm(userdata)
      getV1Group(userdata).then(res => {
          this.tableData = res.data.list
      })
  }
};
</script>
<style scoped>
.topImg {
  width: 600px;
  height: 400px;
}
.indexTable {
  margin-top: 20px;
}
.add {
  position: absolute;
  bottom: 50px;
}
</style>


