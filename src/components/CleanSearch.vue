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
    <div class="add-btn">
      <el-button class="search-btn" @click="add" type="primary">新增清洗记录</el-button>
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
    <!-- 添加操作的模态框 -->
    <el-dialog title="修改执法记录" :visible.sync="addDialogFormVisible">
      <div class="edit-container">
        <div class="edit-item">
          <div class="edit-key">选择企业和设备</div>
          <!-- 企业id和设备id的二级下拉框 -->
          <el-cascader
            @change="handleAddSelectChange"
            v-model="addFormData.addSelectValue"
            :options="options"
            clearable
          ></el-cascader>
        </div>
        <div class="edit-item">
          <div class="edit-key">清洗时间</div>
          <!-- 时间日期时间选择器 -->
          <el-date-picker
            v-model="addFormData.cleanTime"
            value-format="timestamp"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div class="edit-item">
          <div class="edit-key">清洗原因</div>
          <el-input v-model="addFormData.reason"></el-input>
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
  name: "CleanSearch",
  props: {},
  data() {
    return {
      date: [],
      selectValue: [],
      options: [],
      tableData: [],
      addDialogFormVisible: false,
      addFormData: {
        addSelectValue: [],
        cleanTime: "",
        reason: ""
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
    },
    reloadForm() {
      this.addFormData = {
        addSelectValue: [],
        cleanTime: "",
        reason: ""
      };
      this.addDialogFormVisible = false;
    },
    addCancle() {
      this.reloadForm();
    },
    addSubmit() {
      const reqData = {
        eid: this.addFormData.addSelectValue[0],
        equId: this.addFormData.addSelectValue[1],
        cleanTime: this.addFormData.cleanTime / 1000,
        reason: this.addFormData.reason
      };

      this.$axios.post("/equipmentFlow/addEquCleanData", reqData).then(res => {
        if (res.data.error.returnCode === 0 && res.data.data.result === "0") {
          this.$message({
            message: "添加清洗记录成功",
            type: "success"
          });
          this.reloadForm();
          this.search();
        } else {
          this.$message.error("添清洗记录失败");
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
