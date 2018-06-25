<template>
    <div>
        <div>
            <el-input class="int" v-model="name" placeholder="账户名"></el-input>
        </div>
        <div style="margin-top:20px;">   
            <el-input class="int" v-model="passWord" placeholder="密码"></el-input>
        </div>
        <el-button class="btn">发送验证码</el-button>
        <el-button class="btn" @click.native="choose">登入</el-button>
    </div>
</template>
<script>
import {login} from '../api/api'
import {jsonToForm} from '../public/public'
export default {
    data(){
        return {
            name:'',
            passWord:''
        }
    },
    methods:{
        choose(){
            let sendData = {
                userName:this.name,
                passWord:this.passWord
            }
            sendData = this.jsonToForm(sendData)
            login(sendData).then(res => {
                if (res.data.sc == 0) {
                    console.log('success')
                    sessionStorage.setItem('userName',this.name)
                    this.$router.push({
                        path:'/main'
                    })
                }
                else {
                    console.log('登入失败')
                }
            })

        },
        jsonToForm:jsonToForm
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



