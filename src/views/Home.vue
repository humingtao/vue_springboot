<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" class="imgS">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <router-link to="/page">
      <div class="btns">
        <el-button type="primary">页面</el-button>
        <el-button type="primary">主要按钮</el-button>
      </div>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  data () {
    return {};
  },
  created () {
    this.getToken();
  },
  methods: {
    async getToken () {
        const { data: res } = await this.$http.get('/sysUser/getSysuser?username=admin&password=123456');
        console.log(res);
        if (res.code !== 200 || res == null) {
            return this.$message.error('登录失败！');
        }
        this.$message.success('登录成功');
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        console.log(res.data.token);
        window.sessionStorage.setItem('token', res.data.token);
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home');
        }
    }
  };

</script>

<style lang="less" scope>

.imgS {
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  margin-top: 250px;
}

.btns {
    display: flex;
    // justify-content: flex-end;
    margin-left: 710px;
    margin-top: 30px;
}

</style>
