<template>
  <div class="container">
    <div class="header">
      <!-- 选择企业下拉框 需要判断身份显示不同的数据 -->
      <el-select v-model="eid" placeholder="请选择企业id">
        <el-option v-for="item in eidArr" :key="item.name" :label="item.name" :value="item.eid"></el-option>
      </el-select>
      <!-- 查询按钮 -->
      <el-button class="search-btn" @click="search" type="primary">查询</el-button>
    </div>
    <!-- 添加档案只有环保部门能显示 -->
    <div class="add-btn">
      <el-button class="search-btn" @click="add" type="primary">添加档案</el-button>
    </div>
    <div class="table-container">
      <!-- 数据表格 -->
      <el-table :data="tableData" height="600">
        <el-table-column prop="eid" label="企业id"></el-table-column>
        <el-table-column prop="type" label="企业类型"></el-table-column>
        <el-table-column prop="ename" label="企业名称"></el-table-column>
        <el-table-column prop="oamCompany" label="运维公司"></el-table-column>
        <el-table-column prop="level" label="餐饮级别"></el-table-column>
        <el-table-column prop="equNum" label="环保设施数量"></el-table-column>
        <el-table-column prop="area" label="地区"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleEditClick(scope.row)" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加操作的模态框 -->
    <el-dialog title="编辑档案" :visible.sync="addDialogFormVisible">
      <div class="edit-container">
        <div class="edit-item">
          <div class="edit-key">企业id</div>
          <el-input v-model="addFormData.eid" placeholder="请输入企业id"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">企业类型</div>
          <el-input v-model="addFormData.type" placeholder="请输入企业类型"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">企业名称</div>
          <el-input v-model="addFormData.ename" placeholder="请输入企业名称"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">运维公司</div>
          <el-input v-model="addFormData.oamCompany" placeholder="请输入运维公司"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">餐饮级别</div>
          <el-select v-model="addFormData.level" placeholder="请选择餐饮级别">
            <el-option
              v-for="item in levelArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="edit-item">
          <div class="edit-key">地区</div>
        </div>
        <div class="edit-item">
          <div class="edit-key">密码</div>
          <el-input v-model="addFormData.password" placeholder="请输入密码"></el-input>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancle">取 消</el-button>
        <el-button type="primary" @click="addSubmit">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑操作的模态框 -->
    <el-dialog title="编辑档案" :visible.sync="dialogFormVisible">
      <div class="edit-container">
        <div class="edit-item">
          <div class="edit-key">企业id</div>
          <el-input disabled v-model="formData.eid"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">企业类型</div>
          <el-input v-model="formData.type"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">企业名称</div>
          <el-input v-model="formData.ename"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">运维公司</div>
          <el-input v-model="formData.oamCompany"></el-input>
        </div>
        <!-- 餐饮级别 只有环保部门能修改，需要判断 -->
        <div class="edit-item">
          <div class="edit-key">餐饮级别</div>
          <el-input v-model="formData.level"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">环保设施数量</div>
          <el-input v-model="formData.equNum"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">地区</div>
          <el-input v-model="formData.area"></el-input>
        </div>
        <div class="edit-item">
          <div class="edit-key">密码</div>
          <el-input v-model="formData.password"></el-input>
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
  name: "FileSearch",
  props: {},
  data() {
    return {
      addEidArr: [],
      eidArr: [],
      eid: "",
      tableData: [],
      formData: {
        eid: "",
        type: "",
        ename: "",
        oamCompany: "",
        level: "",
        area: "",
        password: "",
        equNum: ""
      },
      addFormData: {
        eid: "",
        type: "",
        ename: "",
        oamCompany: "",
        level: "",
        area: "",
        password: ""
      },
      dialogFormVisible: false,
      addDialogFormVisible: false,
      levelArr: [
        {
          name: "级别A",
          value: "A"
        },{
          name: "级别B",
          value: "B"
        },{
          name: "级别C",
          value: "C"
        },
      ]
    };
  },
  mounted() {
    // 请求所有的企业刘表
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
        // 如果是环保部门需要先渲染全部数据
        this.tableData = res.data.data;
      }
      this.addEidArr = formatAddEid;
      this.eidArr = formatEid;
    });
  },
  methods: {
    search() {
      this.$axios
        .post("/enterprise/showInfo", {
          eid: this.eid
        })
        .then(res => {
          if (res.data.error.returnCode === 0) {
            this.tableData = res.data.data;
          } else {
            this.$message.error("请求失败");
          }
        });
    },
    add() {
      this.addDialogFormVisible = true;
    },
    handleEditClick(row) {
      console.log(row);
      this.formData = row;
      this.dialogFormVisible = true;
    },
    reloadForm() {
      this.dialogFormVisible = false;
      this.addDialogFormVisible = false;
      this.formData = {
        eid: "",
        type: "",
        ename: "",
        oamCompany: "",
        level: "",
        area: "",
        password: "",
        equNum: ""
      };
    },
    editSubmit() {
      this.reloadForm();
    },
    editCancle() {
      this.reloadForm();
    },
    addSubmit() {
      this.reloadForm();
    },
    addCancle() {
      this.reloadForm();
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
