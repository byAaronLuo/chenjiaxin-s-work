<!--
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-15 12:39:30
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-15 14:35:19
-->
<template>
    <div id="HomePage">
        <el-container class="content">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu background-color=" rgb(238, 241, 246)" default-active="1">
              <template v-for="(item,index) in menuList">
                <el-menu-item :key= "index" :index="item.index" @click="jumpRouter(item.url)">{{item.name}}</el-menu-item>
              </template>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header >
              <div class="divHeader">
                <div class="divHeaderFirst">酒店管理系统后台</div>
                <div class="divHeaderSecond">
                  <el-dropdown style="cursor:default">
                    <span style="margin-right:10px">{{username}}</span>
                      <i class="el-icon-setting" style="margin-right: 15px"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item style="cursor:pointer" @click.native="jumpRouter('/back/personCenter')">个人中心</el-dropdown-item>
                        <el-dropdown-item style="cursor:pointer" @click.native="logout">注销</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
            </div>
              </div>

            </el-header>
            <el-main>
              <router-view/>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      menuList: [{
        index: '1',
        name: '员工管理',
        url: '/back/workerManage'
      }, {
        index: '2',
        name: '房间管理',
        url: '/back/hotelManage'
      }, {
        index: '3',
        name: '查看订单',
        url: '/back/checkOrder'
      }, {
        index: '4',
        name: '营收信息',
        url: '/back/revenueInfo'
      }],
      username: ''
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
    this.username = result.data.name
  },
  methods: {
    jumpRouter (url) {
      this.$router.push({ path: url })
    },
    async logout () {
      const key = parseInt(window.sessionStorage.getItem('key'))
      const result = await this.$http({
        url: 'LOGOUT',
        method: 'get',
        params: {
          id: key
        }
      })
      if (result.code === 200) {
        this.$message({
          message: '注销成功',
          type: 'success'
        })
        window.sessionStorage.clear()
        this.$router.push({ path: '/' })
      } else {
        this.$message({
          message: '网络繁忙，请稍后重试',
          type: 'error'
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  #HomePage {
    height: 100%;
    width: 100%;
    .content{
      height: 100%;
      border: 1px solid #eee
    }
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
   }
    .el-aside {
      color: #333;
    }
    .divHeader{
      display: flex;
      justify-content: space-between;

    }
  }
</style>
