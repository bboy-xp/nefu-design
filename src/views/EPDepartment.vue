<template>
  <div class="ep-department-container">
    <div class="header">
      <div class="title">环保监测管理系统</div>
      <div class="user">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588856017451&di=311773772bf4f4d0e09a3fe82e3a06b8&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e2e62e6f57458ca32394a10211a9616498d25bd5459-K2uzdk_fw658"
          alt
          class="avatar"
        />
        <el-popover placement="top" width="160" v-model="visible">
          <p>确认要退出系统吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="exit">确定</el-button>
          </div>
          <div class="username" slot="reference">{{name}}</div>
        </el-popover>
      </div>
    </div>
    <div class="content">
      <div class="nav">
        <el-menu
          class="el-menu-vertical-demo"
          @select="selectMenu"
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
              <el-menu-item index="CurrentDataSearch">实时数据查询</el-menu-item>
              <el-menu-item index="HistoryDataSearch">历史数据查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-brush"></i>
              <span>清洗管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="CleanSearch">查询清洗记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document-delete"></i>
              <span>异常管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="ErrorSearch">异常查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>档案管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="FileSearch">档案查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span>监督执法</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="LawSearch">执法记录查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="nav-content">
        <div :is="currentView"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CurrentDataSearch from "@/components/CurrentDataSearch.vue";
import HistoryDataSearch from "@/components/HistoryDataSearch.vue";
import CleanSearch from "@/components/CleanSearch.vue";
import ErrorSearch from "@/components/ErrorSearch.vue";
import FileSearch from "@/components/FileSearch.vue";
import LawSearch from "@/components/LawSearch.vue";
import Blank from "@/components/Blank.vue";

export default {
  name: "EPDepartment",
  components: {
    CurrentDataSearch,
    HistoryDataSearch,
    Blank,
    CleanSearch,
    ErrorSearch,
    FileSearch,
    LawSearch
  },
  data() {
    return {
      currentView: "Blank",
      visible: false,
      name: ""
    };
  },
  mounted() {
    if (!localStorage.getItem("account")) {
      this.$router.push("/");
    }
    this.name = localStorage.getItem("name");
  },
  methods: {
    selectMenu(index) {
      if (this.currentView === index) {
        return;
      }
      // console.log(index);
      this.currentView = index;
    },
    exit() {
      this.visible = false;
      // 清除缓存
      localStorage.removeItem("account");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.ep-department-container {
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
  padding: 20px;
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
  height: 40px;
  width: 40px;
  border-radius: 40px;
  margin-right: 10px;
}
.username {
  font-size: 20px;
  color: rgb(32, 32, 32);
  font-weight: bold;
}
</style>
