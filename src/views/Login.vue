<template>
    <div class="login_container">
        <div class="logo_box">
            <img src="../assets/logo1.png" alt="">
        </div>
        <div class="login_box">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="login_form">
                <FormItem  prop="user" style="width: 250px;" >
                    <Input type="text" v-model="formInline.user" placeholder="Username" size="large" clearable >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <br>
                <FormItem prop="password" style="width: 250px;">
                    <Input type="password" v-model="formInline.password" placeholder="Password" size="large" clearable >
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <br>
                <FormItem>
                    <Button type="primary" @click="signIn('formInline')">登录</Button>
                </FormItem>
                <FormItem style="margin-left:120px">
                    <Button type="primary" @click="signUp()">注册</Button>
                </FormItem>
            </Form>
            <!-- <Button type="info" size="large" @click="getToken">登录</Button>
            <Button type="Primary" size="large" @click="getRegister">注册</Button> -->
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不小于6位', trigger: 'blur' }
                ]
            }
        };
    },
    created () {
        // this.getToken();
    },
    methods: {
        signUp () {
            this.$router.push('/register');
        },
        signIn () {
            this.$refs.formInline.validate(async valid => {
                if (!valid) return;
            console.log(this.formInline);
            const { data: res } = await this.$http.get('/sysUser/getSysuser?username=' + this.formInline.user + '&password=' + this.formInline.password);
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
            });
            }
    }
};
</script>

<style lang="less" scope>
body{
    overflow-y: hidden;
    overflow-x: hidden;
}
.login_container {
    background-color: #dcdee2;
    background: url('../assets/logo.jpg')  center;
    height: 100%;
}

.login_form {
    position: relative;
    bottom: 0;
    top: 320px;
    left: 600px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.logo_box {
    position: absolute;
    left: 600px;
    top: 60px;
}
.logo_box img {
    width: 300px;
    height: 200px;
}
</style>
