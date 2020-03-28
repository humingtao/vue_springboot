<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>人员分组</el-breadcrumb-item>
                <el-breadcrumb-item>年龄分布</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="myChart" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            options: {
                title: {
                    text: '年龄分布',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '年龄',
                        type: 'pie',
                        radius: '55%',
                        data: [
                            // { value: 235, name: '视频广告' },
                            // { value: 274, name: '联盟广告' },
                            // { value: 310, name: '邮件营销' },
                            // { value: 335, name: '直接访问' },
                            // { value: 400, name: '搜索引擎' }
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        itemStyle: {
                            normal: {
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            }
        };
    },
    mounted () {
        this.getEcharts();
    },
    methods: {
        async getEcharts () {
            const { data: res } = await this.$http.get('/user/ageGroup');
            for (var j = 0, len = res.data.length; j < len; j++) {
                // console.log(this.options.series[0].data);
                this.options.series[0].data.push(res.data[j]);
            }
            const myChart = this.$echarts.init(document.getElementById('myChart'));
            myChart.setOption(this.options);
        }
    }
};
</script>
