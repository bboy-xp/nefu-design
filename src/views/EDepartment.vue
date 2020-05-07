<template>
  <div class="enterprise-department-container">
    <div class="header">
      <div class="title">环保监测管理系统</div>
      <div class="user">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588856017451&di=311773772bf4f4d0e09a3fe82e3a06b8&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e2e62e6f57458ca32394a10211a9616498d25bd5459-K2uzdk_fw658" alt="" class="avatar">
        <div class="username">心平心平心平</div>
      </div>
    </div>
    <div class="content">
      <div class="nav">
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据监测</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">历史数据查询</el-menu-item>
              <el-menu-item index="1-1">添加环保设施</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-brush"></i>
              <span>清洗管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">查询清洗记录</el-menu-item>
              <el-menu-item index="2-1">新增清洗记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document-delete"></i>
              <span>异常管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">异常查询</el-menu-item>
              <el-menu-item index="3-2">异常申报</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>档案管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">档案查询</el-menu-item>
              <el-menu-item index="4-2">档案修改</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="nav-content">

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "EDepartment",
  components: {}
};
</script>
<style scoped>
.enterprise-department-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.header {
  flex-basis: 80px;
  background-color: rgba(38, 62, 94, 0.863);
  display: flex;
  align-items: center;
}
.title {
  font-size: 30px;
  padding: 0 50px;
  color: rgb(230, 230, 230);
  flex: 1;
}
.content {
  flex: 1;
  display: flex;

}
.nav {
  flex-basis: 204px;
  background-color: rgb(84, 92, 100);
  height: 100%;
}
.nav-content {
  flex: 1;
}
.el-menu {
  border: 0;
}
.user {
  display: flex;
  align-items: center;
  padding-right: 40px;
}
.avatar {
  height: 50px;
  width: 50px;
  border-radius: 50px;
  margin-right: 10px;
}
.username {
  font-size: 20px;
  color: rgb(32, 32, 32);
  font-weight: bold;
}
</style>
