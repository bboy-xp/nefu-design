<template>
  <div class="container">
    <div class="header">

      <!-- 选择起止时间日期时间选择器 -->
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CleanSearch',
  props: {
  },
  data() {
    return {
      date: []
    };
  },
}
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
