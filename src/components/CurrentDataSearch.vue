<template>
  <div class="container">
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
      tableData: [],
      eid: ""
    };
  },
  created() {
    this.eid = localStorage.getItem("account");
    this.init();
  },
  mounted: {},
  methods: {
    init() {
      let url =
        "ws://120.26.172.72:8800/user/" + this.eid + "/point/sendUserData";
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
