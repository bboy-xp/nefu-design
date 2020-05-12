<template>
  <div class="container">
    <div class="header">
      <!-- 企业id和设备id的二级下拉框 -->
      <el-cascader
        v-model="selectValue"
        :options="options"
        :props="{ checkStrictly: true }"
        clearable
      ></el-cascader>
      <!-- 选择起止时间日期时间选择器 -->
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
      ></el-date-picker>
      <!-- 设施情况下拉框 -->
      <el-select v-model="isdeal" placeholder="请选择异常处理情况">
        <el-option v-for="item in dealArr" :key="item.name" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <!-- 查询按钮 -->
      <el-button class="search-btn" @click="search" type="primary">查询</el-button>
    </div>
    <div class="table-container">
      <!-- 数据表格 -->
      <el-table :data="tableData" height="600">
        <el-table-column prop="recordId" label="异常记录编号"></el-table-column>
        <el-table-column prop="ename" label="企业名称"></el-table-column>
        <el-table-column prop="eid" label="企业id"></el-table-column>
        <el-table-column prop="equId" label="设施id"></el-table-column>
        <el-table-column prop="abnormalReason" label="异常原因"></el-table-column>
        <el-table-column prop="isdeal" label="是否处理完毕"></el-table-column>
        <el-table-column prop="createTime" label="发生时间"></el-table-column>
        <el-table-column prop="dealTime" label="处理时间"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination @current-change="currentChange" background layout="prev, pager, next" :page-count="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorSearch",
  props: {},
  data() {
    return {
      date: [],
      selectValue: [],
      options: [],
      isdeal: 2,
      dealArr: [
        {
          name: "全部",
          value: 2
        },
        {
          name: "处理",
          value: 1
        },
        {
          name: "未处理",
          value: 0
        }
      ],
      tableData: [],
      currentPage: 1,
      pageSize: "20",
      total: 0
    };
  },
  mounted() {
    // 请求获取企业与设备的关联数组
    this.$axios.get("/equipment/showEquData").then(res => {
      if (res.data.error.returnCode === 0) {
        this.options = res.data.data;
      } else {
        this.$message.error("获取所有企业设备信息失败");
      }
    });
  },
  methods: {
    search() {
      const reqData = {};
      if (this.date.length === 2) {
        reqData["startTime"] = this.date[0] / 1000;
        reqData["endTime"] = this.date[1] / 1000;
      }
      reqData["eid"] = this.selectValue[0];
      reqData["equId"] = this.selectValue[1];
      reqData["isdeal"] = this.isdeal;
      // 需要并将数值型的pageNo转换为字符串
      reqData["pageNo"] = this.currentPage + "";
      reqData["pageSize"] = this.pageSize;

      this.$axios.post("/abnormal/showAbnormalData", reqData).then(res => {
        if (res.data.error.returnCode === 0) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.data;
        } else {
          this.$message.error("请求失败");
        }
      });
    },
    currentChange(pageNumber) {
      this.currentPage = pageNumber;
      this.search();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  padding-bottom: 30px;
}
.pagination-container {
  margin-top: 20px;
  text-align: end;
}
</style>
