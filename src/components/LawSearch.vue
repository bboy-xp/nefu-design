<template>
  <div class="container">
    <div class="header">
      <!-- 选择环保人员下拉框 -->
      <el-select v-model="environmentalId" placeholder="请选择环保人员">
        <el-option
          v-for="item in environmentalIdArr"
          :key="item.name"
          :label="item.name"
          :value="item.environmentalId"
        ></el-option>
      </el-select>
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
      <!-- 查询按钮 -->
      <el-button class="search-btn" @click="search" type="primary">查询</el-button>
    </div>
    <div class="add-btn">
      <el-button class="search-btn" @click="add" type="primary">添加执法记录</el-button>
    </div>
    <div class="table-container">
      <!-- 数据表格 -->
      <el-table :data="tableData" height="600">
        <el-table-column prop="environmentalId" label="环保人员id"></el-table-column>
        <el-table-column prop="eid" label="被监督企业id"></el-table-column>
        <el-table-column prop="ename" label="被监督企业名称"></el-table-column>
        <el-table-column prop="recordId" label="记录编号"></el-table-column>
        <el-table-column prop="envName" label="执法部门名称"></el-table-column>
        <el-table-column prop="time" label="执法时间"></el-table-column>
        <el-table-column prop="lawEnforcementResult" label="执法结果"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleEditClick(scope.row)" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑操作的模态框 -->
    <el-dialog title="修改执法记录" :visible.sync="dialogFormVisible">
      <div class="edit-container">
        <div class="edit-item">
          <div class="edit-key">执法时间</div>
          <!-- 时间日期时间选择器 -->
          <el-date-picker
            v-model="formData.time"
            value-format="timestamp"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div class="edit-item">
          <div class="edit-key">执法结果</div>
          <el-input v-model="formData.lawEnforcementResult"></el-input>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancle">取 消</el-button>
        <el-button type="primary" @click="editSubmit">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 添加操作的模态框 -->
    <el-dialog title="修改执法记录" :visible.sync="addDialogFormVisible">
      <div class="edit-container">
        <div class="edit-item">
          <div class="edit-key">环保人员</div>
          <!-- 选择环保人员下拉框 -->
          <el-select v-model="addFormData.environmentalId" placeholder="请选择环保人员">
            <el-option
              v-for="item in addEnvironmentalIdArr"
              :key="item.name"
              :label="item.name"
              :value="item.environmentalId"
            ></el-option>
          </el-select>
        </div>
        <div class="edit-item">
          <div class="edit-key">被监督企业名称</div>
          <!-- 选择企业下拉框 -->
          <el-select v-model="addFormData.eid" placeholder="请选择企业">
            <el-option v-for="item in addEidArr" :key="item.name" :label="item.name" :value="item.eid"></el-option>
          </el-select>
        </div>
        <div class="edit-item">
          <div class="edit-key">执法时间</div>
          <!-- 时间日期时间选择器 -->
          <el-date-picker
            v-model="addFormData.time"
            value-format="timestamp"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div class="edit-item">
          <div class="edit-key">执法结果</div>
          <el-input v-model="addFormData.lawEnforcementResult"></el-input>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancle">取 消</el-button>
        <el-button type="primary" @click="addSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LawSearch",
  props: {},
  data() {
    return {
      eid: "",
      eidArr: [],
      addEidArr: [],
      environmentalId: "",
      environmentalIdArr: [],
      addEnvironmentalIdArr: [],
      date: [],
      tableData: [],
      dialogFormVisible: false,
      addDialogFormVisible: false,
      formData: {
        time: "",
        lawEnforcementResult: "",
        recordId: "",
        environmentalId: "",
        eid: ""
      },
      addFormData: {
        time: "",
        lawEnforcementResult: "",
        environmentalId: "",
        eid: ""
      }
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    search() {
      const reqData = {};
      if (this.date.length === 2) {
        reqData["startTime"] = this.date[0] / 1000;
        reqData["endTime"] = this.date[1] / 1000;
      }
      reqData["environmentalId"] = this.environmentalId;
      reqData["eid"] = this.eid;
      this.$axios
        .post("/lawEnforcementRecord/showRecord", reqData)
        .then(res => {
          if (res.data.error.returnCode === 0) {
            this.tableData = res.data.data;
          } else {
            this.$message.error("请求失败");
          }
        });
    },
    initData() {
      this.$axios.get("/enterprise/showAllInfo").then(res => {
        if (!res.data.error.returnCode === 0) {
          this.$message.error("获取企业列表失败");
          return;
        }

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
      this.$axios.get("/environmental/showEnvData").then(res => {
        if (!res.data.error.returnCode === 0) {
          this.$message.error("获取环保人员列表失败");
          return;
        }
        const formatEnvironmentalId = [
          {
            name: "全部"
          }
        ];
        const formatAddEnvironmentalId = [];
        // 处理environmentalId数组
        if (res.data.data) {
          for (let i = 0; i < res.data.data.length; i++) {
            formatEnvironmentalId.push({
              environmentalId: res.data.data[i].environmentalId,
              name: res.data.data[i].name
            });
            formatAddEnvironmentalId.push({
              environmentalId: res.data.data[i].environmentalId,
              name: res.data.data[i].name
            });

          }
        }
        this.environmentalIdArr = formatEnvironmentalId;
        this.addEnvironmentalIdArr = formatAddEnvironmentalId;
      });
    },
    handleEditClick(row) {
      console.log(row);
      this.formData["eid"] = row.eid;
      this.formData["recordId"] = row.recordId;
      this.formData["environmentalId"] = row.environmentalId;

      this.dialogFormVisible = true;
    },
    reloadForm() {
      this.formData = {
        time: "",
        lawEnforcementResult: "",
        recordId: "",
        environmentalId: "",
        eid: ""
      };
      this.addFormData = {
        time: "",
        lawEnforcementResult: "",
        environmentalId: "",
        eid: ""
      };
      this.dialogFormVisible = false;
      this.addDialogFormVisible = false;
    },
    editCancle() {
      this.reloadForm();
    },
    editSubmit() {
      const reqData = this.formData;
      reqData.time = reqData.time / 1000;

      this.$axios
        .post("/lawEnforcementRecord/modifyRecord", reqData)
        .then(res => {
          if (res.data.error.returnCode === 0 && res.data.data.result === "0") {
            this.$message({
              message: "修改执法记录成功",
              type: "success"
            });
            this.reloadForm();
            this.search();
          } else {
            reqData.time = reqData.time * 1000;
            this.$message.error("修改执法记录失败");
          }
        });
    },
    addCancle() {
      this.reloadForm();
    },
    addSubmit() {
      const reqData = this.addFormData;
      reqData.time = reqData.time / 1000;

      this.$axios.post("/lawEnforcementRecord/addRecord", reqData).then(res => {
        if (res.data.error.returnCode === 0 && res.data.data.result === "0") {
          this.$message({
            message: "添加执法记录成功",
            type: "success"
          });
          this.reloadForm();
          this.search();
        } else {
          this.$message.error("添加执法记录失败");
        }
      });
    },
    add() {
      this.addDialogFormVisible = true;
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
.edit-item {
  display: flex;
  padding: 10px 0;
}
.edit-key {
  width: 150px;
  display: flex;
  align-items: center;
}
.add-btn {
  padding-bottom: 40px;
}
</style>
