<template>
  <div class="container">
    <div class="header">
      <!-- 企业id和设备id的二级下拉框 -->
      <el-cascader
        @change="handleSelectChange"
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

      <!-- 查询按钮 -->
      <el-button class="search-btn" @click="search" type="primary">查询</el-button>
    </div>
    <div class="table-container">
      <!-- 数据表格 -->
      <el-table :data="tableData" height="600">
        <el-table-column prop="eid" label="企业id"></el-table-column>
        <el-table-column prop="ename" label="企业名称"></el-table-column>
        <el-table-column prop="equId" label="设施id"></el-table-column>
        <el-table-column prop="cleanTime" label="时间"></el-table-column>
        <el-table-column prop="reason" label="清洗原因"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CleanSearch",
  props: {},
  data() {
    return {
      date: [],
      selectValue: [],
      options: [],
      tableData: []
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
    handleSelectChange(value) {},
    search() {
      const reqData = {};
      if (this.date.length === 2) {
        reqData["startTime"] = this.date[0] / 1000;
        reqData["endTime"] = this.date[1] / 1000;
      }
      reqData["eid"] = this.selectValue[0];
      reqData["equId"] = this.selectValue[1];

      this.$axios.post("/equipmentFlow/showEquCleanData", reqData).then(res => {
        if (res.data.error.returnCode === 0) {
          this.tableData = res.data.data;
        } else {
          this.$message.error("请求失败");
        }
      });
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
</style>
