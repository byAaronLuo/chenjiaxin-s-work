<!--
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-17 09:44:37
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-17 10:12:01
-->
<template>
  <div id="revenueInfo">
    <el-table
    :data="tableList"
    style="width: 100%"
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
      prop="name"
      label="财务名"
      align="center">
    </el-table-column>
    <el-table-column
      prop="value"
      label="财务值"
      align="center">
    </el-table-column>
    <el-table-column
     align="center"
      prop="status"
      label="收入/支出状态"
      :filters="[{ text: '收入', value: 0 }, { text: '支出', value: 1 }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === 0 ? 'success' : 'error'"
          disable-transitions>{{scope.row.status|changeValue}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableList: []
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    async getTableList () {
      const result = await this.$http({
        url: 'REVENUEINFOLIST',
        method: 'get'
      })
      if (result.code === 200) {
        this.tableList = result.data
      }
    },
    filterTag (value, row) {
      return row.status === value
    }
  },
  filters: {
    changeValue (str) {
      if (str === 0) {
        return '收入'
      } else if (str === 1) {
        return '支出'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  #revenueInfo{
    height: 100%;
  }
</style>
