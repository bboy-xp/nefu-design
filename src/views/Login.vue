<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">登录平台</div>
      <div class="input-container">
        <div class="input-item">
          <span class="key-text">用户名</span>
          <input v-model="username" type="text" class="input">
        </div>
        <div class="input-item">
          <span class="key-text">密码</span>
          <input v-model="password" type="password" class="input">
        </div>
      </div>
      <el-button @click="submit" type="primary" class="submit-btn">登录</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  components: {},
  data() {
    return {
      uername: "",
      password: "",
    }
  },
  methods: {
    submit() {
      console.log(this.username,this.password);
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  background-image: url("../../public/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  height: 300px;
  width: 500px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  text-align: center;
}
.title {
  font-size: 30px;
  font-weight: bold;
  color: rgb(56, 56, 56);
  letter-spacing: 5px;
  margin: 20px 0;
}
.input-item {
  padding: 15px;
}
.key-text {
  display: inline-block;
  font-size: 24px;
  margin-right: 20px;
  width: 80px;
}
.input {
  border: 0;
  height: 30px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.15);
  font-size: 18px;
}
.submit-btn {
  padding: 12px 40px;
  margin-top: 20px;
}
</style>
