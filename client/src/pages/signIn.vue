<template>
    <div>
        <div>
            <el-input class="int" v-model="name" placeholder="账户名"></el-input>
        </div>
        <div style="margin-top:20px;">   
            <el-input class="int" v-model="passWord" placeholder="密码"></el-input>
        </div>
        <el-button class="btn" @click.native="sign">注册</el-button>
    </div>
</template>
<script>
import {signIn} from '../api/api'
export default {
    data(){
        return {
            name:'',
            passWord:''
        }
    },
    methods:{
        sign(){
            let sendData = {
                userName:this.name,
                passWord:this.passWord
            }
            signIn(JSON.stringify(sendData)).then(res => {
                if (res.data.sc == 0) {
                    console.log('success')
                    this.$router.push({
                        path : '/login',
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
.int {
    width: 150px;
    margin: 0 auto;
}
.btn {
    margin-top: 20px;
}
</style>

