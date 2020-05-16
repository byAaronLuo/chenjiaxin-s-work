<!--
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-15 20:43:49
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-16 23:06:56
-->
<template>
  <div id="RoomManage">
    <div style="margin-bottom:1rem">
      <el-row>
        <el-button type="success" @click="openModal('新增订单')">新增订单</el-button>
        <el-button type="success" @click="openModal('新增费用')">新增费用</el-button>
        <el-button type="primary" @click="openModal('修改订单')">修改订单</el-button>
        <el-button type="primary" @click="openModal('查看费用')">查看费用</el-button>
        <el-button type="danger" @click="deleteOrder">删除订单</el-button>
        <el-button type="warning" @click="settlement">退房</el-button>
      </el-row>
    </div>
    <el-table
    :data="tableList"
    style="width: 100%"
    @row-click="clickRow"
    highlight-current-row
    ref="orderTable"
    border
    stripe
    >
    <el-table-column
      prop="id"
      label="id"
      align="center">
    </el-table-column>
    <el-table-column
      prop="customerVO.customerName"
      label="客户姓名"
      align="center">
    </el-table-column>
    <el-table-column
      prop="customerVO.customerType"
      label="客户类型"
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
      prop="payNum"
      label="已付款"
      align="center">
    </el-table-column>
    <el-table-column
      prop="notPayNum"
      label="未付款"
      align="center">
    </el-table-column>
    <el-table-column
      prop="reserveTime"
      label="预计入住时间"
      align="center"
      width="170">
    </el-table-column>
    <el-table-column
      prop="reserveOutTime"
      label="预计退房时间"
      align="center"
      width="170">
    </el-table-column>
    <el-table-column
      prop="outTime"
      label="实际退房时间"
      align="center"
      width="170">
    </el-table-column>
    <el-table-column
      prop="costStatus"
      label="支付状态"
      align="center">
    </el-table-column>
  </el-table>
  <el-dialog :title="modalTitle" :visible.sync="orderModal" @close="closeModal">
    <el-form ref="orderFrom" :model="orderFrom" label-width="80px" label-position="left" style="width:100%">
      <el-form-item label="客户名称">
        <el-input v-model="orderFrom.customerVO.customerName"></el-input>
      </el-form-item>
      <el-form-item label="客户电话">
        <el-input v-model="orderFrom.customerVO.phone"></el-input>
      </el-form-item>
      <el-form-item label="客户性别">
        <el-select v-model="orderFrom.customerVO.sex" placeholder="请选择客户性别" style="width:100%">
          <el-option v-for="(item,index) in sexList" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="orderFrom.customerVO.idNumber"></el-input>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-select v-model="orderFrom.customerVO.customerType" placeholder="请选择客户类型" style="width:100%">
          <el-option label="新用户" :value="0"></el-option>
          <el-option label="老用户" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间号">
        <el-select v-model="orderFrom.roomId" placeholder="请选择房间号" style="width:100%">
          <el-option v-for="(item,index) in roomList" :key="index" :label="item.roomId" :value="item.roomId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入住时间">
       <el-date-picker v-model="time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00','12:00:00']" style="width:100%">
    </el-date-picker>
      </el-form-item>
      <el-form-item label="付款状态" v-if="modalTitle==='新增订单'">
        <el-select v-model="orderFrom.costStatus" placeholder="请选择客户付款状态" style="width:100%" >
          <el-option label="已付款" :value="1"></el-option>
          <el-option label="未付款" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="orderModal=false">取 消</el-button>
      <el-button type="primary" @click="confirmOrder">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog :title="modalTitle" :visible.sync="costModal" @close="closeModal">
    <el-form ref="costFrom" :model="costFrom" label-width="80px" label-position="left" style="width:100%">
      <el-form-item label="订单id">
        <el-input v-model="costFrom.recordId"></el-input>
      </el-form-item>
        <el-form-item label="费用选择">
        <el-select v-model="costFrom.costId" placeholder="请选择酒店费用" style="width:100%" >
          <el-option v-for="(item,index) in costList" :key="index" :label="item.costName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="费用">
        <el-input v-model="costFrom.costValue"></el-input>
      </el-form-item>
      <el-form-item label="折扣">
        <el-input v-model="costFrom.discount"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="costModal=false">取 消</el-button>
      <el-button type="primary" @click="confirmCost">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog :title="modalTitle" :visible.sync="catModal" @close="closeModal">
    <el-table :data="costTableList">
      <el-table-column property="recordId" label="订单id" align="center"></el-table-column>
      <el-table-column property="costName" label="额外消费详情" align="center"></el-table-column>
      <el-table-column property="costValue" label="价格" align="center"></el-table-column>
      <el-table-column property="discount" label="折扣" align="center"></el-table-column>
      <el-table-column property="status" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center"  width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="catModal=false">取 消</el-button>
      <el-button type="primary" @click="catModal=false">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableList: [],
      roomList: [],
      orderModal: false,
      costModal: false,
      catModal: false,
      modalTitle: '',
      orderFrom: {
        customerVO: {
          customerName: '',
          phone: '',
          sex: '',
          idNumber: '',
          customerType: ''
        },
        roomId: '',
        reserveTime: '',
        reserveOutTime: '',
        costStatus: ''
      },
      time: [],
      row: {},
      costFrom: {
        recordId: '',
        costId: '',
        costValue: '',
        discount: '',
        status: ''
      },
      costList: [],
      costTableList: [],
      sexList: [{
        label: '男',
        value: 1
      }, {
        label: '女',
        value: 0
      }]
    }
  },
  async created () {
    this.getRoom()
    this.getTableList()
    const result = await this.$http({
      url: 'COSTLIST',
      method: 'get'
    })
    if (result.code === 200) {
      this.costList = result.data
    }
  },
  methods: {
    dataFormata (value) {
      // 格式化时间格式
      if (value) {
        const time = {
          year: value.getFullYear(),
          mouth: value.getMonth() + 1,
          day: value.getDate(),
          hour: value.getHours(),
          min: value.getMinutes(),
          sec: value.getSeconds()
        }
        for (const i in time) {
          if (time[i] >= 0 && time[i] < 10) {
            time[i] = '0' + time[i]
          }
        }
        let format = 'yyyy-MM-dd hh:mm:ss'
        format = format
          .replace(/yyyy/g, time.year)
          .replace(/MM/g, time.mouth)
          .replace(/dd/g, time.day)
          .replace(/hh/g, time.hour)
          .replace(/mm/g, time.min)
          .replace(/ss/g, time.sec)
        return format
      }
      return ''
    },
    async getCostTableList (id) {
      const result = await this.$http({
        url: 'GETCOST',
        method: 'get',
        params: { recordId: id }
      })
      if (result.code === 200) {
        for (const i in result.data) {
          if (result.data[i].status === 0) {
            result.data[i].status = '未付款'
          } else {
            result.data[i].status = '已付款'
          }
        }
        this.costTableList = result.data
      }
      return result.code
    },
    async getTableList () {
      const result = await this.$http({
        url: 'GETORDERLIST',
        method: 'get'
      })
      if (result.code === 200) {
        for (const i in result.data) {
          if (result.data[i].customerVO.customerType === 1) {
            result.data[i].customerVO.customerType = '老用户'
          } else if (result.data[i].customerVO.customerType === 0) {
            result.data[i].customerVO.customerType = '新用户'
          }
          if (result.data[i].costStatus === 0) {
            result.data[i].costStatus = '未付款'
          } else if (result.data[i].costStatus === 1) {
            result.data[i].costStatus = '已付款'
          } else if (result.data[i].costStatus === 2) {
            result.data[i].costStatus = '已完成'
          }
          if (result.data[i].roomType === 1) {
            result.data[i].roomType = '单人房'
          } else if (result.data[i].roomType === 2) {
            result.data[i].roomType = '双人房'
          } else if (result.data[i].roomType === 3) {
            result.data[i].roomType = '大床房'
          } else if (result.data[i].roomType === 4) {
            result.data[i].roomType = '钟点房'
          }
          result.data[i].reserveTime = this.dataFormata(new Date(result.data[i].reserveTime))
          result.data[i].reserveOutTime = this.dataFormata(new Date(result.data[i].reserveOutTime))
          if (result.data[i].outTime) {
            result.data[i].outTime = this.dataFormata(new Date(result.data[i].outTime))
          }
        }
        this.tableList = result.data
      } else {
        this.$message({
          message: '查询失败',
          type: 'error'
        })
      }
    },
    async getRoom () {
      const result = await this.$http({
        url: 'GETROOMLIST',
        method: 'get'
      })
      if (result.code === 200) {
        for (const i in result.data) {
          if ((result.data[i].stayStatus === 0) && (result.data[i].cleanStatus === 1)) {
            this.roomList.push(result.data[i])
          }
        }
      }
    },
    clickRow (row, column) {
      this.row = row
    },
    async openModal (title) {
      if (title.indexOf('订单') !== -1) {
        this.modalTitle = title
        if (title === '新增订单') {
          this.orderFrom = {
            customerVO: {
              customerName: '',
              phone: '',
              sex: '',
              idNumber: '',
              customerType: ''
            },
            roomId: '',
            time: '',
            reserveTime: '',
            reserveOutTime: '',
            costStatus: ''
          }
          this.orderModal = true
        } else {
          this.modalTitle = title
          if (this.row.id) {
            if (this.row.costStatus === '已完成') {
              this.$message({
                message: '此订单已经完成，无法修改',
                type: 'info'
              })
            } else {
              this.orderModal = true
              // 打开dialog，进行下一步操作
              this.orderFrom = JSON.parse(JSON.stringify(this.row))
              if (this.orderFrom.customerVO.customerType === '老用户') {
                this.orderFrom.customerVO.customerType = 1
              } else {
                this.orderFrom.customerVO.customerType = 0
              }
              this.time = []
              this.time.push(new Date(this.orderFrom.reserveTime))
              this.time.push(new Date(this.orderFrom.reserveOutTime))
              delete this.orderFrom.notPayNum
              delete this.orderFrom.payNum
              delete this.orderFrom.outTime
              delete this.orderFrom.roomType
              delete this.orderFrom.costStatus
            }
          } else {
            this.$message({
              message: '请先选择一个订单进行修改',
              type: 'error'
            })
          }
        }
      } else if (title.indexOf('费用') !== -1) {
        this.modalTitle = title
        if (title === '新增费用') {
          if (this.row.id) {
            this.costFrom = {
              recordId: this.row.id,
              costId: '',
              costValue: '',
              discount: '',
              status: ''
            }
            this.costModal = true
          } else {
            this.$message({
              message: '请先选择一个订单进行新增费用',
              type: 'error'
            })
          }
        } else if (title === '查看费用') {
          if (this.row.id) {
            if (this.row.costStatus === '已完成') {
              this.$message({
                message: '此订单已经完成，无法查看',
                type: 'info'
              })
            } else {
              const code = await this.getCostTableList(this.row.id)
              if (code === 200) {
                this.catModal = true
              }
            }
          } else {
            this.$message({
              message: '请先选择一个订单进行查看',
              type: 'error'
            })
          }
        }
      }
    },
    closeModal () {
      this.getTableList()
      this.row = {}
      this.orderModal = false
    },
    async confirmOrder () {
      if (this.modalTitle === '新增订单') {
        const copyObj = JSON.parse(JSON.stringify(this.orderFrom)) // deepCopy
        copyObj.reserveTime = this.time[0]
        copyObj.reserveOutTime = this.time[1]
        const result = await this.$http({
          url: 'CREATEORDER',
          method: 'post',
          params: copyObj
        })
        if (result.code === 200) {
          this.$message({
            message: '新增订单成功',
            type: 'success'
          })
          this.getTableList(copyObj.id)
          this.orderModal = false
        } else {
          this.$message({
            message: '新增订单失败',
            type: 'error'
          })
        }
      } else if (this.modalTitle === '修改订单') {
        this.orderFrom.reserveTime = this.time[0]
        this.orderFrom.reserveOutTime = this.time[1]
        const result = await this.$http({
          url: 'UPDATEORDER',
          method: 'post',
          params: this.orderFrom
        })
        if (result.code === 200) {
          this.$message({
            message: '修改订单成功',
            type: 'success'
          })
          this.getTableList(this.orderFrom.id)
          this.orderModal = false
        } else {
          this.$message({
            message: '修改订单失败',
            type: 'error'
          })
        }
      }
      this.time = []
    },
    async confirmCost () {
      if (this.modalTitle === '新增费用') {
        const copyObj = JSON.parse(JSON.stringify(this.costFrom))
        delete copyObj.status
        const result = await this.$http({
          url: 'COSTCREATE',
          method: 'post',
          params: copyObj
        })
        if (result.code === 200) {
          this.$message({
            message: '新增费用成功',
            type: 'success'
          })
          this.getTableList()
          this.costModal = false
        } else {
          this.$message({
            message: '新增费用失败',
            type: 'error'
          })
        }
      } else {
        const copyObj = JSON.parse(JSON.stringify(this.costFrom))
        delete copyObj.status
        delete copyObj.costName
        const result = await this.$http({
          url: 'COSTUPDATE',
          method: 'post',
          params: copyObj
        })
        if (result.code === 200) {
          this.$message({
            message: '修改费用成功',
            type: 'success'
          })
          this.getCostTableList(copyObj.recordId)
          this.getTableList()
          this.costModal = false
        } else {
          this.$message({
            message: '修改费用失败',
            type: 'error'
          })
        }
      }
    },
    handleEdit (index, row) {
      this.costModal = true
      this.costFrom = JSON.parse(JSON.stringify(row))
      this.modalTitle = '修改费用'
    },
    handleDelete (index, row) {
      const self = this
      const copyObj = JSON.parse(JSON.stringify(row))
      delete copyObj.status
      delete copyObj.costName
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await self.$http({
          url: 'COSTDELETE',
          method: 'post',
          params: copyObj
        })
        if (result.code === 200) {
          self.getCostTableList(copyObj.recordId)
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
        self.getCostTableList(copyObj.recordId)
      })
    },
    deleteOrder () {
      const self = this
      if (this.row.id) {
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await self.$http({
            url: 'DELETEORDER',
            method: 'post',
            params: { id: this.row.id }
          })
          if (result.code === 200) {
            self.getTableList()
            self.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.row = {}
            self.getTableList()
          }
        }).catch(() => {
          self.$message({
            type: 'error',
            message: '已取消删除'
          })
          this.row = {}
          self.getTableList()
        })
      }
    },
    recordPay (data) {
      const self = this
      if (this.row.id) {
        this.$confirm(`确认结算, 一共消费${data.notPay}元是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await self.$http({
            url: 'ORDERPAY',
            method: 'post',
            params: { id: data.id }
          })
          if (result.code === 200) {
            self.getTableList()
            self.$message({
              type: 'success',
              message: '结算成功!'
            })
            this.row = {}
          }
        }).catch(() => {
          self.$message({
            type: 'error',
            message: '结算失败'
          })
          this.row = {}
          self.getTableList()
        })
      } else {
        this.$message({
          message: '费用结算失败',
          type: 'error'
        })
      }
    },
    settlement () {
      const self = this
      if (this.row.id) {
        if (this.row.costStatus === '已完成') {
          this.$message({
            message: '此订单已经完成，无法退房',
            type: 'info'
          })
        } else {
          this.$confirm('确认退房, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            const result = await self.$http({
              url: 'ORDERSETTLEMENT',
              method: 'post',
              params: { id: this.row.id }
            })
            if (result.code === 200) {
              self.getTableList()
              self.$message({
                type: 'success',
                message: '退房成功!'
              })
              this.recordPay(result.data)
              this.row = {}
            }
          }).catch(() => {
            self.$message({
              type: 'error',
              message: '退房失败'
            })
            this.row = {}
            self.getTableList()
          })
        }
      } else {
        this.$message({
          message: '请先选择一个订单进行退房',
          type: 'error'
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
