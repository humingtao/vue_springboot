<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>人员管理系统</span>
      </div>
      <span>当前登录账户：{{username}}</span>
      <span>当前系统鼠标点击次数：{{$store.state.count}}</span>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- <i class="el-icon-user"></i> -->
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <span></span>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// @ is an alias to /src

export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        111: 'el-icon-user',
        110: 'el-icon-s-custom',
        112: 'el-icon-setting',
        113: 'el-icon-pie-chart'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      username: ''
    };
  },
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    };
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
    this.getMenuList();
  },
  methods: {
    // 获取所有的菜单
    async getMenuList () {
      const user = window.sessionStorage.getItem('user');
      this.username = user;
      // console.log(user);
      const { data: res } = await this.$http.get('/menu/menu');
      if (res.code !== 200) return this.$message.error(res.msg);
      this.menulist = res.data;
    },
      logout () {
        this.$store.commit('mutationsZero');
        window.sessionStorage.clear();
        this.$router.push('/login');
        this.$message.success('退出成功');
      },
      // 点击按钮，切换菜单的折叠与展开
      toggleCollapse () {
        this.$store.dispatch('actionsAddCount', 1);
        this.isCollapse = !this.isCollapse;
      },
      // 保存链接的激活状态；点击菜单的时候对应的path存进sessionStorage，然后当home页面刚被刷新创建的时候，立即取出来赋值给左侧菜单进行激活；点击每个二级菜单的时候立即给activePath重新赋值
      saveNavState (activePath) {
          this.$store.commit('mutationsAddCount', 1);
          window.sessionStorage.setItem('activePath', activePath);
          this.activePath = activePath;
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

.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>
