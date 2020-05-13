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
        <el-table-column label="发生时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDateTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDateTime(scope.row.dealTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleReportClick(scope.row)" type="text">异常申报</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          @current-change="currentChange"
          background
          layout="prev, pager, next"
          :page-count="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 申报操作的模态框 -->
    <el-dialog title="异常申报" :visible.sync="dialogFormVisible">
      <div class="edit-container">
        <div class="edit-item">
          <div class="edit-key">处理时间</div>
          <!-- 时间日期时间选择器 -->
          <el-date-picker
            v-model="formData.dealTime"
            value-format="timestamp"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div class="edit-item">
          <div class="edit-key">异常原因</div>
          <el-input v-model="formData.abnormalReason"></el-input>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancle">取 消</el-button>
        <el-button type="primary" @click="editSubmit">提 交</el-button>
      </div>
    </el-dialog>
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
      total: 0,
      dialogFormVisible: false,
      formData: {
        dealTime: "",
        abnormalReason: "",
        recordId: "",
        equId: ""
      }
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
    formatDateTime(inputTime) {
      var date = new Date(inputTime * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
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
    },
    handleReportClick(row) {
      this.dialogFormVisible = true;
      this.formData.recordId = row.recordId;
      this.formData.equId = row.equId;
    },
    reloadForm() {
      this.formData = {
        dealTime: "",
        abnormalReason: "",
        recordId: "",
        equId: ""
      };
      this.dialogFormVisible = false;
    },
    editCancle() {
      this.reloadForm();
    },
    editSubmit() {
      const reqData = this.formData;
      reqData.dealTime = reqData.dealTime / 1000;

      this.$axios.post("/abnormal/dealAbnormal", reqData).then(res => {
        if (res.data.error.returnCode === 0 && res.data.data.result === "0") {
          this.$message({
            message: "异常申报成功",
            type: "success"
          });
          this.reloadForm();
          this.search();
        } else {
          reqData.dealTime = reqData.dealTime * 1000;
          this.$message.error("异常申报失败");
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
.pagination-container {
  margin-top: 20px;
  text-align: end;
}
.add-btn {
  padding-bottom: 40px;
}
.edit-item {
  display: flex;
  padding: 10px 0;
}
.edit-key {
  width: 150px;
  display: flex;
  align-items: center;
}
</style>
