<!--
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-15 18:13:06
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-16 23:07:13
-->
<template>
  <div id="RoomManage">
    <div style="margin-bottom:1rem">
      <el-row>
        <el-button type="success" @click="openModal('新增房间')">新增房间</el-button>
        <el-button type="primary" @click="openModal('修改房间')">修改房间</el-button>
        <el-button type="danger" @click="deleteRoom">删除房间</el-button>
      </el-row>
    </div>
    <el-table
    :data="tableList"
    style="width: 100%"
    @row-click="clickRow"
    highlight-current-row
    ref="hotelTable"
    border
    stripe
    >
    <el-table-column
      prop="id"
      label="id"
      align="center">
    </el-table-column>
    <el-table-column
      prop="roomId"
      label="房间号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="roomType"
      label="房间类型"
      align="center">
    </el-table-column>
    <el-table-column
      prop="stayStatus"
      label="房间状态"
      align="center">
    </el-table-column>
    <el-table-column
      prop="cleanStatus"
      label="清洁状态"
      align="center">
    </el-table-column>
    <el-table-column
      prop="roomPrice"
      label="房间价格"
      align="center">
    </el-table-column>
  </el-table>
  <el-dialog :title="modalTitle" :visible.sync="orderModal" @close="closeModal">
      <el-form :model="hotelManageForm" label-width="80px" label-position="left" style="width:100%" ref="workerForm">
        <el-form-item label="房间号" prop="roomId">
            <el-input type="text" v-model="hotelManageForm.roomId" placeholder="请输入房间号" :autofocus="true" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="房间类型" prop="roomType">
            <el-select v-model="hotelManageForm.roomType" placeholder="请选择" style="width:100%">
                <el-option v-for="item in roomTypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间状态" prop="stayStatus">
            <el-select v-model="hotelManageForm.stayStatus" placeholder="请选择" style="width:100%">
                <el-option v-for="item in stayStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="清洁状态" prop="cleanStatus">
            <el-select v-model="hotelManageForm.cleanStatus" placeholder="请选择" style="width:100%">
                <el-option v-for="item in cleanStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间价格" prop="roomPrice">
            <el-input type="text" v-model="hotelManageForm.roomPrice" placeholder="请输入房间价格" :clearable="true" ></el-input>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderModal=false">取 消</el-button>
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
      orderModal: false,
      modalTitle: '',
      hotelManageForm: {
        id: '',
        roomId: '',
        roomType: '',
        stayStatus: '',
        cleanStatus: '',
        roomPrice: ''
      },
      row: {},
      roomTypes: [{
        label: '单人房',
        value: 1
      }, {
        label: '双人房',
        value: 2
      }, {
        label: '大床房',
        value: 3
      }, {
        label: '钟点房',
        value: 4
      }],
      stayStatus: [{
        label: '未入住',
        value: 0
      },
      {
        label: '已入住',
        value: 1
      }],
      cleanStatus: [{
        label: '未清洁',
        value: 0
      },
      {
        label: '已清洁',
        value: 1
      }]
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    changeList (key, value) {
      const roomType = new Map()
      roomType.set(1, '单人房')
      roomType.set(2, '双人房')
      roomType.set(3, '大床房')
      roomType.set(4, '钟点房')
      const roomTypeValue = new Map()
      roomTypeValue.set('单人房', 1)
      roomTypeValue.set('双人房', 2)
      roomTypeValue.set('大床房', 3)
      roomTypeValue.set('钟点房', 4)
      const stayStatus = new Map()
      stayStatus.set(0, '未入住')
      stayStatus.set(1, '已入住')
      const stayStatusValue = new Map()
      stayStatusValue.set('未入住', 0)
      stayStatusValue.set('已入住', 1)
      const cleanStatus = new Map()
      cleanStatus.set(0, '未清洁')
      cleanStatus.set(1, '已清洁')
      const cleanStatusValue = new Map()
      cleanStatusValue.set('未清洁', 0)
      cleanStatusValue.set('已清洁', 1)
      if (key === 'roomType') {
        return roomType.get(value)
      } else if (key === 'stayStatus') {
        return stayStatus.get(value)
      } else if (key === 'cleanStatus') {
        return cleanStatus.get(value)
      } else if (key === 'stayStatusValue') {
        return stayStatusValue.get(value)
      } else if (key === 'roomTypeValue') {
        return roomTypeValue.get(value)
      } else if (key === 'cleanStatusValue') {
        return cleanStatusValue.get(value)
      }
    },
    async getTableList () {
      const result = await this.$http({
        url: 'GETROOMLIST',
        method: 'get'
      })
      if (result.code === 200) {
        for (const i of result.data) {
          i.roomType = this.changeList('roomType', i.roomType)
          i.stayStatus = this.changeList('stayStatus', i.stayStatus)
          i.cleanStatus = this.changeList('cleanStatus', i.cleanStatus)
        }
        this.tableList = result.data
      } else {
        this.$message({
          message: '查询失败',
          type: 'error'
        })
      }
    },
    clickRow (row, column) {
      this.row = row
      console.log(column)
    },
    openModal (title) {
      this.modalTitle = title
      if (this.modalTitle === '新增房间') {
        this.hotelManageForm = {
          id: '',
          roomId: '',
          roomType: '',
          stayStatus: '',
          cleanStatus: '',
          roomPrice: ''
        }
        this.orderModal = true
      } else if (this.modalTitle === '修改房间') {
        if (this.row.id) {
          this.orderModal = true
          this.hotelManageForm = JSON.parse(JSON.stringify(this.row))
          this.hotelManageForm.roomType = this.changeList('roomTypeValue', this.hotelManageForm.roomType)
          this.hotelManageForm.stayStatus = this.changeList('stayStatusValue', this.hotelManageForm.stayStatus)
          this.hotelManageForm.cleanStatus = this.changeList('cleanStatusValue', this.hotelManageForm.cleanStatus)
          console.log(this.hotelManageForm)
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
      this.orderModal = false
    },
    async confirm () {
      if (this.modalTitle === '新增房间') {
        const copyObject = JSON.parse(JSON.stringify(this.hotelManageForm))
        delete copyObject.id
        const result = await this.$http({
          url: 'CREATEROOM',
          method: 'post',
          params: copyObject
        })
        if (result.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        }
      } else if (this.modalTitle === '修改房间') {
        const result = await this.$http({
          url: 'UPDATEROOM',
          method: 'post',
          params: this.hotelManageForm
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
      this.orderModal = false
      this.getTableList()
    },
    deleteRoom () {
      const self = this
      if (this.row.id) {
        this.$confirm('此操作将永久删除该房间, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await self.$http({
            url: 'DELETEROOM',
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
    #RoomManage{
        height: 100%;
        .inputSize{
          width: 80%;
        }
    }
</style>
