<template>
    <div class=" d-flex">
        <dashboard></dashboard>
        <div class="container chart-info ">
            <div class="content-chart d-flex pb-5">
                <div class="new-chart user">
                    <Bar :data="chartUser.chartData" :options="chartUser.options" style="height: 300px; width: 400px;" />
                </div>
                <div class="new-chart product">
                    <Bar :data="chartProduct.chartData" :options="chartProduct.options"
                        style="height: 300px; width: 400px;" />
                </div>
            </div>
            <div class="new-chart total-actual">
                <Line :data="planetChartData.chartData" :options="planetChartData.options" style="width:600px;" />
            </div>
            <el-calendar v-model="date" style="width: 1000px; height: 700px;" />
        </div>


    </div>
</template>
<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import dashboard from './Sidebar.vue'
import { Line, Bar, Doughnut } from 'vue-chartjs'
import { planetChartData, chartUser } from '../common/chart_dash.js'
import chartProduct from '../common/chartProduct.js'
import { mapGetters } from 'vuex'
import store from '../../../main'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'dashboard.chartjs',
    components: {
        dashboard,
        Line,
        Bar,
        Doughnut

    },
    data() {
        return {
            planetChartData: planetChartData,
            chartUser: chartUser,
            chartProduct: chartProduct,
            date: new Date()
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    beforeRouteEnter(to, from, next) {
        if (!store.isLogin) {
            next()
        } else {
            next({
                name: 'admin.sign-in'
            })
        }
    }

}
</script>