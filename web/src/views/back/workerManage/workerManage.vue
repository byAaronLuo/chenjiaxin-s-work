<!--
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-15 12:53:51
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-15 18:03:25
-->
<template>
  <div id="WorkerManage">
    <div style="margin:0.5rem 0">
      <el-row>
        <el-button type="success" @click="openModal('新增用户')">新增用户</el-button>
        <el-button type="primary" @click="openModal('修改用户')">修改用户</el-button>
        <el-button type="danger" @click="deleteUser">删除用户</el-button>
      </el-row>
    </div>
    <el-table
    :data="tableList"
    style="width: 100%"
    @row-click="clickRow"
    highlight-current-row
    ref="workerTable"
    border
    stripe
    >
    <el-table-column
      prop="id"
      label="id"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      align="center">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      align="center">
    </el-table-column>
    <el-table-column
      prop="roleType"
      label="权限"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      align="center">
    </el-table-column>
    <el-table-column
      prop="idNumber"
      label="身份证"
      align="center">
    </el-table-column>
    <el-table-column
      prop="wage"
      label="工资"
      align="center">
    </el-table-column>
  </el-table>
  <el-dialog :title="modalTitle" :visible.sync="workerModal" @close="closeModal">
  <el-form :model="workerManageForm" label-width="80px" label-position="left" style="width:100%" ref="workerForm">
    <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="workerManageForm.name" placeholder="请输入用户名" :autofocus="true" :clearable="true"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="text" v-model="workerManageForm.password" placeholder="请输入密码" :clearable="true"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="roleType">
        <el-input type="text" v-model="workerManageForm.roleType" placeholder="请输入权限" :clearable="true" ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input type="text" v-model="workerManageForm.sex"  placeholder="请输入性别" :clearable="true" ></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idNumber">
        <el-input type="text" v-model="workerManageForm.idNumber" placeholder="请输入身份证" :clearable="true" ></el-input>
      </el-form-item>
      <el-form-item label="工资" prop="wage">
        <el-input type="text" v-model="workerManageForm.wage" placeholder="请输入工资" :clearable="true" ></el-input>
      </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="workerModal=false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableList: [],
      workerModal: false,
      modalTitle: '',
      workerManageForm: {
        id: '',
        name: '',
        password: '',
        roleType: '',
        sex: '',
        idNumber: '',
        wage: ''
      },
      row: {}
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    async getTableList () {
      const result = await this.$http({
        url: 'GETALLWORKERLIST',
        method: 'get'
      })
      if (result.code === 200) {
        this.$message({
          message: '查询成功',
          type: 'success'
        })
        this.tableList = result.data
      }
    },
    clickRow (row) {
      this.row = row
    },
    openModal (title) {
      this.modalTitle = title
      if (this.modalTitle === '新增用户') {
        this.workerManageForm = {
          id: '',
          name: '',
          password: '',
          roleType: '',
          sex: '',
          idNumber: '',
          wage: ''
        }
        this.workerModal = true
      } else if (this.modalTitle === '修改用户') {
        if (this.row.id) {
          this.workerModal = true
          this.workerManageForm = JSON.parse(JSON.stringify(this.row))
          if (this.workerManageForm.sex === 0) {
            this.workerManageForm.sex = '男'
          } else {
            this.workerManageForm.sex = '女'
          }
        } else {
          this.$message({
            message: '请先选择一个用户进行修改',
            type: 'error'
          })
        }
      }
    },
    closeModal () {
      this.getTableList()
      this.row = {}
      this.workerModal = false
    },
    async confirm () {
      if (this.workerManageForm.sex === '男') {
        this.workerManageForm.sex = '0'
      } else if (this.workerManageForm.sex === '女') {
        this.workerManageForm.sex = '1'
      }
      if (this.modalTitle === '新增用户') {
        const copyObject = JSON.parse(JSON.stringify(this.workerManageForm))
        delete copyObject.id
        const result = await this.$http({
          url: 'CREATEWORKER',
          method: 'post',
          params: copyObject
        })
        if (result.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        }
      } else if (this.modalTitle === '修改用户') {
        const result = await this.$http({
          url: 'UPDATEWORKER',
          method: 'post',
          params: this.workerManageForm
        })
        if (result.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      }
      this.row = {}
      this.workerModal = false
      this.getTableList()
    },
    deleteUser () {
      const self = this
      if (this.row.id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await self.$http({
            url: 'DELETEWORKER',
            method: 'post',
            params: {
              id: self.row.id
            }
          })
          if (result.code === 200) {
            self.getTableList()
            self.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.row = {}
          }
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          })
          this.row = {}
          self.getTableList()
        })
      }
    }
  }

}
</script>
<style lang="scss" scoped>
    #workerManage{
        height: 100%;
        .inputSize{
          width: 80%;
        }
    }
</style>
