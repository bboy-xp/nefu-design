<template>
  <div class="container">
    <div class="header"  v-if="role==='1'">
      <!-- 选择企业下拉框 -->
      <el-select v-model="searchEid" placeholder="请选择企业">
        <el-option v-for="item in eidArr" :key="item.name" :label="item.name" :value="item.eid"></el-option>
      </el-select>
      <!-- 查询按钮 -->
      <el-button class="search-btn" @click="search" type="primary">查询</el-button>
    </div>
    <div class="table-containe">
      <!-- 数据表格 -->
      <el-table :data="tableData" height="600">
        <el-table-column prop="ename" label="企业名称"></el-table-column>
        <el-table-column prop="equId" label="设施id"></el-table-column>
        <el-table-column prop="state" label="设施状态值"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentDataSearch",
  props: {},
  data() {
    return {
      role: "",
      tableData: [],
      eid: "",
      searchEid: "",
      eidArr: []
    };
  },
  created() {
    this.role = localStorage.getItem("role");
    this.eid = localStorage.getItem("account");
    this.$axios.get("/enterprise/showAllInfo").then(res => {
      const formatEid = [];
      // 处理eid数组
      if (res.data.data) {
        for (let i = 0; i < res.data.data.length; i++) {
          formatEid.push({
            eid: res.data.data[i].eid,
            name: res.data.data[i].ename
          });
        }
      }
      this.eidArr = formatEid;
    });
    if (this.role === "0") {
      this.init(this.eid);
    }
  },
  mounted: {},
  methods: {
    init(eid) {
      // 初始化数组
      this.tableData = [];
      let url = "ws://120.26.172.72:8800/user/" + eid + "/point/sendUserData";
      // 创建websocket连接
      this.websock = new WebSocket(url); // 监听打开
      this.websock.onopen = this.websockOpen; // 监听关闭
      this.websock.onclose = this.websockClose; //监听异常
      this.websock.onerror = this.websockError; //监听服务器发送的消息
      this.websock.onmessage = this.websockMessage;
    },
    websockOpen() {
      console.log("监听打开");
    },
    websockClose() {
      console.log("监听关闭");
    },
    websockError() {
      console.log("监听异常");
    },
    websockMessage(e) {
      console.log("监听服务器发送的消息", e.data);
      if (e.data !== "连接成功") {
        // console.log(JSON.parse(e.data))
        this.tableData = JSON.parse(e.data);
      }
      // console.log(this.tableData)
    },
    search() {
      this.init(this.searchEid);
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
