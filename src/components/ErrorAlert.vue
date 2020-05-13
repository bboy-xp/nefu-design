<template>
  <div class="container">
    <div class="table-containe">
      <!-- 数据表格 -->
      <el-table :data="tableData" height="600">
        <el-table-column prop="message" label="消息内容"></el-table-column>
        <el-table-column prop="time" label="时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDateTime(scope.row.time) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorAlert",
  props: {},
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
    initData() {
      this.$axios
        .post("/message/getMessage", {
          eid: this.eid,
          type: "0"
        })
        .then(res => {
          if (res.data.error.returnCode === 0) {
            this.tableData = res.data.data;
          } else {
            this.$message.error("请求查询历史报警信息失败");
          }
        });
    },
    init() {
      let url = "ws://120.26.172.72:8800/user/" + this.eid + "/point/abnormalDataAlarm";
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
        this.tableData = JSON.parse(e.data).concat(this.tableData);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
