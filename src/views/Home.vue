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
  methods: {
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
