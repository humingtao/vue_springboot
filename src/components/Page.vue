<template>
    <div>
        <h3 class="center">这是一个分页演示</h3>
        <!-- table表格区域 -->
        <el-table :data='goodslist' border stripe align>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="username" width="80px"></el-table-column>
            <el-table-column label="生日" prop="birthday">
                <template slot-scope="scope">
                {{scope.row.birthday | dateFormat}}
            </template>
            </el-table-column>
            <el-table-column label="性别" prop="sex" width="120px"></el-table-column>
            <el-table-column label="地址" prop="address" width="140px"></el-table-column>
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
        // 查询参数对象
        queryInfo: {
            query: '',
            pageNo: 1,
            pageSize: 10
        },
        // 商品列表
        goodslist: [],
        total: 0,
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
        this.getGoodsList();
    },
    methods: {
        async getGoodsList () {
            // console.log(0);
            const { data: res } = await this.$http.get('/user/getAll', {
                params: this.queryInfo
            });
            // this.$message.success('获取用户列表成功！');
            // console.log(res.data.navigatePages);
            this.goodslist = res.data.list;
            this.total = res.data.total;
        },
        handleSizeChange (newSize) {
            this.queryInfo.pageSize = newSize;
            this.getGoodsList();
        },
        handleCurrentChange (newPage) {
            this.queryInfo.pageNo = newPage;
            this.getGoodsList();
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
                var d = new Date(this.editForm.birthday);
                var youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                // 发起修改用户信息的请求
                const { data: res } = await this.$http.put('/user/updateUser/?id=' + this.editForm.id + '&birthday=' + youWant + '&sex=' + this.editForm.sex + '&address=' + this.editForm.address
                );
                if (res.code !== 200) {
                    return this.$message.error('更新用户信息失败！');
                }
                // 关闭对话框
                this.editDialogVisible = false;
                // 重新获取用户列表数据
                this.getGoodsList();
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
            this.getGoodsList();
        }
    }
};
</script>

<style lang="less" scope>

.center {
    text-align: center;
    margin-top: 10px;
}

</style>
