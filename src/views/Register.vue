<template>
    <div class="register_container">
        <h2 style="text-align: center; margin: 20px 0 0 750px; position:absolute;">注册用户</h2>
        <div class="register_box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="个人简介" prop="info">
                    <el-input v-model="ruleForm.info"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                    <el-button @click="resetForm('ruleForm')" style="margin-left: 100px">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
    return {
        ruleForm: {
            username: '',
            pass: '',
            checkPass: '',
            info: ''
        },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            pass: [
                { validator: validatePass, message: '请输入密码', trigger: 'blur', required: true }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur', required: true }
            ]
        }
    };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
            if (valid) {
                console.log(this.ruleForm);
                const { data: res } = await this.$http.put('/sysUser/addSysuser?username=' + this.ruleForm.username + '&password=' + this.ruleForm.pass + '&info=' + this.ruleForm.info);
                if (res.code !== 200 || res == null) {
                    return this.$message.error('注册失败！');
                }
                    this.$message.success('注册成功');
                    this.$router.push('/login');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="less" scope>
.register_container {
    background-color: #dcdee2;
    // background: url('../assets/logo.jpg')  center;
    height: 100%;
}

.register_box {
    position:absolute;
    height: 300px;
    width: 500px;
    margin-left: 500px;
    margin-top: 100px;
}
</style>
