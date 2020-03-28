<template>
    <div class="headContainer">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片试图 -->
        <el-card>
            <el-table :data="rightsList" border stripe align>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="权限名称" prop="psName"></el-table-column>
                <el-table-column label="ID" prop="psId"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template slot-scope="scope">
                    <el-tag v-if="scope.row.psLevel === '0'">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.psLevel === '1'">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination class="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryInfo.pageNo" :page-sizes="[5,10,15,20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 权限列表
            rightsList: [],
                queryInfo: {
                query: '',
                pageNo: 1,
                pageSize: 10
            },
            total: 0
        };
    },
    created () {
        // 获取所有的权限
        this.getRightList();
    },
    // 获取权限列表
    methods: {
        async getRightList () {
            const { data: res } = await this.$http.get('/spPermission/getAll', { params: this.queryInfo });
            if (res.code !== 200) {
                return this.$message.error('获取权限列表失败！');
            }
            this.rightsList = res.data.list;
            this.total = res.data.total;
            console.log(this.rightsList);
        },
        handleSizeChange (newSize) {
            this.queryInfo.pageSize = newSize;
            this.getRightList();
        },
        handleCurrentChange (newPage) {
            this.queryInfo.pageNo = newPage;
            this.getRightList();
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
    overflow-y: scroll;
    width: 100%;
    height: 100%;
}
</style>
