<template>
    <div>
        <p>姓名：
            <el-input class="name" v-model="name" placeholder="姓名"></el-input>
        </p>
        <p>
            地址：<el-input class="adress" v-model="adress" placeholder="地址"></el-input>
        </p>

        <el-button class="btn" @click.native="add">确认</el-button>
    </div>
</template>
<script>
import {add} from '../api/api'
export default {
    data(){
        return {
            name:'',
            adress:''
        }
    },
    methods:{
        add(){
            let addData = {
                name:this.name,
                adress:this.adress
            }
            add(JSON.stringify(addData)).then(res => {
                if (res.data.sc == 0){
                    console.log('success')
                    this.$router.push({
                        path:'/main'
                    })
                }
                else {
                    console.log('error')
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style scoped>
.name,.adress {
    width: 150px;
    margin: 0 auto;
}
.btn {
    margin-top: 20px;
}
</style>

