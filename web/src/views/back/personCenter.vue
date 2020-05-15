<!--
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-15 14:14:11
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-15 16:47:50
-->
<template>
  <div id="PersonCenter">
    <el-form :model="personForm" status-icon  ref="personForm" label-width="80px" label-position="left" style="width:60%">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="personForm.name" placeholder="请输入用户名" :autofocus="true" :clearable="true"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwd">
        <el-input type="password" v-model="personForm.password" placeholder="请输入密码" :clearable="true"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="roleType">
        <el-input type="text" v-model="personForm.roleType" :disabled="true" :clearable="true" ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input type="text" v-model="personForm.sex" :disabled="true" :clearable="true" ></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="sex">
        <el-input type="text" v-model="personForm.idNumber"  placeholder="请输入身份证" :clearable="true" ></el-input>
      </el-form-item>
      <el-form-item label="工资" prop="sex">
        <el-input type="text" v-model="personForm.wage" :disabled="true" :clearable="true" ></el-input>
      </el-form-item>
    </el-form>
    <div class="loginButtons">
      <el-button type="primary" @click="updatePerson" class="buttonSize">更新</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      personForm: {
        id: '',
        name: '',
        password: '',
        roleType: '',
        sex: '',
        idNumber: '',
        wage: ''
      },
      copyObject: {}
    }
  },
  async created () {
    const key = parseInt(window.sessionStorage.getItem('key'))
    const result = await this.$http({
      url: 'GETWORKERINFO',
      method: 'get',
      params: {
        id: key
      }
    })
    if (result.code === 200) {
      if (result.data.sex === 0) {
        this.personForm.sex = '男'
      } else {
        this.personForm.sex = '女'
      }
      this.personForm.id = result.data.id
      this.personForm.name = result.data.name
      this.personForm.password = result.data.password
      this.personForm.roleType = result.data.roleType
      this.personForm.idNumber = result.data.idNumber
      this.personForm.wage = result.data.wage
    }
  },
  methods: {
    async updatePerson () {
      this.copyObject = JSON.parse(JSON.stringify(this.personForm))
      if (this.copyObject.sex === '男') {
        this.copyObject.sex = 0
      } else {
        this.copyObject.sex = 1
      }
      console.log(this.copyObject)
      const result = await this.$http({
        url: 'UPDATEPERSONINFO',
        method: 'post',
        params: this.copyObject
      })
      if (result.code === 200) {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
      }
      // let obj = JSON.parse(JSON.stringify(this.personForm)  //浅拷贝
      // console.log(obj)
    }
  }
}
</script>
<style lang='scss' scoped>
#PersonCenter{
  height: 100%;
  width: 100%;
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .buttonSize{
    margin-top:1rem;
    width: 200px;
  }
}
</style>
