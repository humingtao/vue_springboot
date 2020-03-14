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
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)"></el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination class="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryInfo.pageNo" :page-sizes="[5,10,15,20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
        </el-pagination>
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
        total: 0
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
