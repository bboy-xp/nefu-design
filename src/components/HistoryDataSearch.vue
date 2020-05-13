<template>
  <div class="container">
    <div class="header">
      <!-- 选择企业下拉框 -->
      <el-select v-model="eid" placeholder="请选择企业">
        <el-option v-for="item in eidArr" :key="item.name" :label="item.name" :value="item.eid"></el-option>
      </el-select>
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
      <el-select v-model="isRegular" placeholder="请选择设施情况">
        <el-option
          v-for="item in regularArr"
          :key="item.name"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-button class="search-btn" @click="search" type="primary">查询</el-button>
    </div>
    <div class="add-btn">
      <el-button class="search-btn" @click="add" type="primary">添加环保设施</el-button>
    </div>
    <div class="table-container">
      <!-- 数据表格 -->
      <el-table :data="tableData" height="600">
        <el-table-column prop="eid" label="企业id"></el-table-column>
        <el-table-column prop="ename" label="企业名称"></el-table-column>
        <el-table-column prop="equId" label="设施id"></el-table-column>
        <el-table-column prop="state" label="设施状态值"></el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDateTime(scope.row.time) }}</span>
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
    <!-- 添加设施的模态框 -->
    <el-dialog title="添加环保设施" :visible.sync="dialogFormVisible">
      <div class="add-container">
        <div class="add-item">
          <el-select v-model="addEid" placeholder="请选择企业">
            <el-option
              v-for="item in addEidArr"
              :key="item.name"
              :label="item.name"
              :value="item.eid"
            ></el-option>
          </el-select>
        </div>
        <div>
          <el-input v-model="addEquid" placeholder="请输入设施id 可以传多个以‘,’分隔"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HistoryDataSearch",
  props: {},
  data() {
    return {
      eidArr: [],
      addEidArr: [],
      eid: "",
      date: [],
      isRegular: 2,
      regularArr: [
        {
          name: "全部",
          value: 2
        },
        {
          name: "正常",
          value: 0
        },
        {
          name: "不正常",
          value: 1
        }
      ],
      tableData: [],
      dialogFormVisible: false,
      addEid: "",
      addEquid: "",
      currentPage: 1,
      pageSize: "20",
      total: 0
    };
  },
  mounted: function() {
    this.$axios.get("/enterprise/showAllInfo").then(res => {
      const formatEid = [
        {
          name: "全部"
        }
      ];
      const formatAddEid = [];
      // 处理eid数组
      if (res.data.data) {
        for (let i = 0; i < res.data.data.length; i++) {
          formatEid.push({
            eid: res.data.data[i].eid,
            name: res.data.data[i].ename
          });
          formatAddEid.push({
            eid: res.data.data[i].eid,
            name: res.data.data[i].ename
          });
        }
      }
      this.addEidArr = formatAddEid;
      this.eidArr = formatEid;
    });
  },
  methods: {
    formatDateTime(inputTime) {
      var date = new Date(inputTime*1000);
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
      if (this.eid) {
        reqData["eid"] = this.eid;
      }
      if (this.date.length === 2) {
        reqData["startTime"] = this.date[0] / 1000;
        reqData["endTime"] = this.date[1] / 1000;
      }
      reqData["isRegular"] = this.isRegular;
      // 需要并将数值型的pageNo转换为字符串
      reqData["pageNo"] = this.currentPage + "";
      reqData["pageSize"] = this.pageSize;

      this.$axios.post("/equipmentFlow/showDataByEid", reqData).then(res => {
        if (res.data.error.returnCode === 0) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.data;
        } else {
          this.$message.error("请求失败");
        }
      });
    },
    add() {
      this.dialogFormVisible = true;
    },
    submit() {
      const regex = new RegExp("^[0-9a-zA-Z,]+$");
      // console.log(regex.test(this.addEquid));
      if (this.addEid === "" || this.addEquid === "") {
        this.$message.error("必填字段不可为空");
        return;
      }
      if (regex.test(this.addEquid)) {
        const reqAddData = {
          eid: this.addEid,
          equId: this.addEquid
        };
        this.$axios.post("/equipment/addEquipment", reqAddData).then(res => {
          // 这里加上返回字段的判断

          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.dialogFormVisible = false;
          // 清空表单
          this.addEquid = "";
          this.addEid = "";
        });
      } else {
        this.addEquid = "";
        this.$message.error("请输入正确的设备id");
      }
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
.search-btn {
  /* margin-left: 50px; */
}
.add-btn {
  padding-bottom: 40px;
}
.add-item {
  margin-bottom: 30px;
}
.pagination-container {
  margin-top: 20px;
  text-align: end;
}
</style>
