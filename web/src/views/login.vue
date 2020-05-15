<!--
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-14 20:20:41
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-15 13:54:13
-->
<template>
  <div id="login">
    <div class="loginBox">
      <div class="loginBoxTitle">酒店管理系统登录</div>
      <div class="loginBoxForm">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="60px" label-position="left">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="loginForm.name" placeholder="请输入用户名" :autofocus="true" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwd">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" :clearable="true" @keypress.enter.native="login"></el-input>
          </el-form-item>
        </el-form>
        <div class="loginButtons">
          <el-button type="primary" @click="login" class="buttonSize">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    var validatename = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.loginForm.name.length < 5) {
          callback(new Error('用户名至少5位'))
        } else {
          callback()
        }
      }
    }
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 5) {
        callback(new Error('密码错误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { validator: validatename, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    async login () {
      const result = await this.$http({
        url: 'LOGIN',
        method: 'post',
        params: this.loginForm,
        headers: {}
      })
      if (result.code === 200) {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        window.sessionStorage.setItem('key', result.data.id)
        this.$router.push({ path: '/back' })
      } else {
        this.$message({
          message: '用户名或密码错误',
          type: 'error'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#login{
  width: 100%;
  height: 100%;
  background: url('../assets/background.jpg'),no-repeat;
  background-size: cover;
  position: relative;
  .loginBox{
    background:rgba($color: #FFF, $alpha: 0.5);
    width: 30rem;
    height: 20rem;
    position: absolute;
    top:25%;
    right:5%;
    .loginBoxTitle{
      font-size: 20px;
      text-align: center;
      color: black;
      margin:1.5rem 0rem
    }
    .loginBoxForm{
      padding: 2rem;
      .loginButtons{
        display: flex;
        flex-direction: row;
        justify-content: center;
        .buttonSize{
          margin-top:1rem;
          width: 200px;
        }
      }
    }
  }

}
</style>
