<template>
    <div class="headContainer">
        <div><el-backtop :bottom="60">返回顶部</el-backtop></div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!-- <h3>人员清单</h3> -->
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUserList">
                <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
            </el-col>
            </el-row>
            <!-- table表格区域 -->
            <el-table :data='goodslist' border stripe align>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="username" width="150px"></el-table-column>
                <el-table-column label="性别" prop="sex" width="80px"></el-table-column>
                <el-table-column label="生日" prop="birthday" width="180px">
                    <template slot-scope="scope">
                    {{scope.row.birthday | dateFormat}}
                </template>
                </el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="是否激活" width="100px">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isActive" active-color="#13ce66" :active-value="1" :inactive-value="0"  inactive-color="#ff4949" @change="userStateChanged(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="editById(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.id)"></el-button>
                </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination class="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryInfo.pageNo" :page-sizes="[5,10,15,20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
            </el-pagination>
        </el-card>
        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker v-model="addForm.birthday" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <!-- <el-input v-model="addForm.sex"></el-input> -->
                <el-select v-model="addForm.sex" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="addForm.address"></el-input>
            </el-form-item>
            </el-form>
            <!-- 底部按钮区域 -->
            <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户的对话框 -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="用户名">
                <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <!-- <el-input v-model="editForm.birthday"></el-input> -->
                <el-date-picker v-model="editForm.birthday" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="editForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="editForm.address"></el-input>
            </el-form-item>
            </el-form>
            <!-- 底部按钮区域 -->
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
    return {
        options: [{
            value: '男',
            label: '男'
        }, {
            value: '女',
            label: '女'
        }],
        // 查询参数对象
        queryInfo: {
            query: '',
            pageNo: 1,
            pageSize: 10
        },
        // 商品列表
        goodslist: [],
        total: 0,
        addDialogVisible: false,
        addForm: {
            username: '',
            birthday: '',
            sex: '',
            address: ''
        },
        addFormRules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            birthday: [
                { required: true, message: '请输入用户生日', trigger: 'blur' }
            ],
            sex: [
                { required: true, message: '请输入用户性别', trigger: 'blur' }
            ],
            address: [
                { required: true, message: '请输入用户地址', trigger: 'blur' }
            ]
        },
        // 控制修改用户对话框的显示与隐藏
        editDialogVisible: false,
        // 查询都得用户信息对象
        editForm: [],
        // 修改表单得验证对象
        editFormRules: {
            birthday: [
            { required: true, message: '请输入用户生日', trigger: 'blur' }
            // { validator: checkEmail, trigger: 'blur' }
            ],
            sex: [
            { required: true, message: '请输入用户性别', trigger: 'blur' }
            // { validator: checkMobile, trigger: 'blur' }
            ],
            address: [
            { required: true, message: '请输入用户地址', trigger: 'blur' }
            // { validator: checkMobile, trigger: 'blur' }
            ]
        }
    };
    },
    created () {
        this.getUserList();
    },
    methods: {
        // 格式化日期
        formatDate (date) {
            debugger;
            var d = new Date(date);
            var youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            return youWant;
        },
        // 点击按钮，添加新用户
        addUser () {
            this.$refs.addFormRef.validate(async valid => {
            if (!valid) return;
            // 可以发起添加用户的网络请求
            // console.log(this.formatDate(this.addForm.birthday));
            const { data: res } = await this.$http.put('/user/addUser?username=' + this.addForm.username + '&birthday=' + this.formatDate(this.addForm.birthday) + '&sex=' + this.addForm.sex + '&address=' + this.addForm.address);
            console.log(res);
            if (res.code !== 200) {
                this.$message.error('添加用户失败！');
            } else {
                this.$message.success('添加用户成功！');
            }
            // 隐藏添加用户的对话框
            this.addDialogVisible = false;
            // 重新获取用户列表数据
            this.getUserList();
            });
        },
        addDialogClosed () {
            this.$refs.addFormRef.resetFields();
        },
        async getUserList () {
            const { data: res } = await this.$http.get('/user/getAll', {
                params: this.queryInfo
            });
            // this.$message.success('获取用户列表成功！');
            // console.log(res.data.navigatePages);
            this.goodslist = res.data.list;
            // console.log(this.goodslist);
            this.total = res.data.total;
        },
        handleSizeChange (newSize) {
            this.queryInfo.pageSize = newSize;
            this.getUserList();
        },
        handleCurrentChange (newPage) {
            this.queryInfo.pageNo = newPage;
            this.getUserList();
        },
        async editById (id) {
            const { data: res } = await this.$http.get('/user/selectOne?id=' + id);
            console.log(res);
            this.editForm = res.data;
            this.editDialogVisible = true;
        },
        // 监听添加用户对话框的关闭事件
        editDialogClosed () {
            this.$refs.editFormRef.resetFields();
        },
        // 修改用户信息并提交
        addUserInfo () {
            this.$refs.editFormRef.validate(async valid => {
                console.log(valid);
                if (!valid) {
                    return;
                };
                // var d = new Date(this.editForm.birthday);
                // var youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                // 发起修改用户信息的请求
                const { data: res } = await this.$http.put('/user/updateUser/?id=' + this.editForm.id + '&birthday=' + this.formatDate(this.editForm.birthday) + '&sex=' + this.editForm.sex + '&address=' + this.editForm.address
                );
                if (res.code !== 200) {
                    return this.$message.error('更新用户信息失败！');
                }
                // 关闭对话框
                this.editDialogVisible = false;
                // 重新获取用户列表数据
                this.getUserList();
                // 提示信息成功
                this.$message.success('更新用户信息成功！');
            });
        },
        async removeById (id) {
            const confirmResult = await this.$confirm('此操作将永久删除用户，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => {
                return err;
            });
            // 用户确认删除，返回为字符串confirm
            // 用户取消删除，返回为字符串cancel
            console.log(confirmResult);
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除');
            }
            const { data: res } = await this.$http.delete('user/deleteById?id=' + id);
            console.log(res);
            if (res.code !== 200 && !res.data) {
                this.$message.error('删除失败！');
            }
            this.$message.success('删除成功！');
            this.getUserList();
        },
        // 监听 switch 开关状态的改变
        async userStateChanged (userinfo) {
            console.log(userinfo);
            const { data: res } = await this.$http.put(
            `user/updateById?id=${userinfo.id}&state=${userinfo.isActive}`
            );
            if (res.code !== 200) {
                userinfo.isActive = !userinfo.isActive;
                return this.$message.error('更新用户状态失败！');
            }
            this.$message.success('更新用户状态成功！');
        }
    }
};
</script>

<style lang="less" scope>

.center {
    margin-top: 10px;
    margin-left: 20px;
}

.headContainer {
    // overflow-y: scroll;
    width: 100%;
    height: 100%;
}

</style>
