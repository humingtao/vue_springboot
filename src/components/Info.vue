<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            <el-breadcrumb-item>信息列表</el-breadcrumb-item>
        </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="280">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="userEmail" label="邮箱">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
            <template slot-scope="scope">
                {{scope.row.createTime | dateFormat}}
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userid: '',
            tableData: [
            ]
        };
    },
    created () {
        this.getInfo();
    },
    methods: {
        async getInfo () {
            this.userid = window.sessionStorage.getItem('id');
            const { data: res } = await this.$http.get('/sysUser/selectOne?id=' + this.userid);
            this.tableData = res.data;
        }
    }
};
</script>
