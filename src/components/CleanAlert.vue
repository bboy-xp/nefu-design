<template>
  <div class="container">
    <div class="table-containe">
      <!-- 数据表格 -->
      <el-table :data="tableData" height="600">
        <el-table-column prop="message" label="消息内容"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CleanAlert',
  props: {
  },
  data() {
    return {
      tableData: [],
      eid: ""
    };
  },
  mounted() {
    this.eid = localStorage.getItem("account");
    this.initData();
    this.init();
  },
  methods: {
    initData() {
      this.$axios.post("/message/getMessage", {
        eid: this.eid,
        type: "1"
      }).then(res => {
        if (res.data.error.returnCode === 0) {
          this.tableData = res.data.data;
        } else {
          this.$message.error("请求查询历史待清洗消息失败");
        }
      });
    },
    init() {
      let url = "wss://xxx/user/" + this.eid + "/point/cleanDataAlarm";
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
      this.tableData = e.data.concat(this.tableData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
