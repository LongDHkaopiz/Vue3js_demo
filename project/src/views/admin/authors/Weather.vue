<template>
    <div class=" d-flex">
        <dashboard></dashboard>
        <div class="container weather-today" style="margin-top: 70px;">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="Location by">
                    <el-input v-model="searchCountry" placeholder="Location by" />
                </el-form-item>
                <el-form-item label="Option by">
                    <el-select v-model="searchOption" class="m-2" placeholder="Select" size="small" label="Option">
                        <el-option label="current" value="current.json" />
                        <el-option label="forecast" value="forecast.json" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getWeather()">Query</el-button>
                </el-form-item>
            </el-form>
            <div class="content-weather d-flex ">
                <div class="info-content">
                    <div class="content">
                        <span class="name_provide">
                            Province / City: {{ weather && weather.location && weather.location.name }}
                        </span>
                        <span class="country">
                            Country: {{ weather && weather.location && weather.location.country }}
                        </span>
                        <span class="tz_id">
                            Time Zone: {{ weather && weather.location && weather.location.tz_id }}
                        </span>
                        <span class="last_updated">
                            Last updated: {{ weather && weather.current && weather.current.last_updated }}
                        </span>
                    </div>
                </div>
                <div class="icon-content">
                    <img :src="weather && weather.current && weather.current.condition.icon" style="width: 100px;">
                    <div class="content">
                        <span class="text">
                            {{ weather && weather.current && weather.current.condition.text }}
                        </span>
                        <span class="tempC">
                            {{ weather && weather.current && weather.current.temp_c }}&deg;C
                        </span>
                        <span class="tempF">
                            {{ weather && weather.current && weather.current.temp_f }}&deg;F
                        </span>
                    </div>
                </div>
                <!-- {{ weather && weather.current && weather.current.condition.icon }} -->
            </div>
            <div class="detail-info">
                <h3>Detailed forecast information</h3>
                <div class="detail-info__inner d-flex">
                    <div class="detail-info__inner-left d-flex">
                        <span>Wind speed in miles per hour: {{ weather && weather.current && weather.current.wind_mph
                        }}</span>
                        <span>Wind speed in kilometer per hour: {{ weather && weather.current && weather.current.wind_kph
                        }}</span>
                        <span>Wind direction in degrees: {{ weather && weather.current && weather.current.wind_degree
                        }}</span>
                        <span>Wind gust in miles per hour: {{ weather && weather.current && weather.current.gust_mph
                        }}</span>
                        <span>Wind gust in kilometer per hour: {{ weather && weather.current && weather.current.gust_kph
                        }}</span>
                    </div>
                    <div class="detail-info__inner-right d-flex">
                        <span>UV Index: {{ weather && weather.current && weather.current.uv }}</span>
                        <span>Pressure in millibars: {{ weather && weather.current && weather.current.pressure_mb }}</span>
                        <span>Pressure in inches: {{ weather && weather.current && weather.current.pressure_in }}</span>
                        <span>Precipitation amount in inches: {{ weather && weather.current && weather.current.precip_in
                        }}</span>
                    </div>
                </div>
            </div>
            <div class="chart-info__forecast" v-show="searchOption === 'forecast.json'">
                <h3 class="title-chart__weather">
                    Real time temperature chart of {{ weather && weather.location && weather.location.name }}
                </h3>
                <Bar v-if="!isLoading" :data="weatherChart.chartData" :options="weatherChart.options"
                    style="width:600px;" />
                <div class="weather-for__7days" style="margin-top: 30px; margin-bottom: 68px;">
                    <h3 class="title-weather" style="margin-bottom: 20px;">
                        Weather forecast for the next 7 days
                    </h3>
                    <el-carousel :interval="2000" type="card" height="220px">
                        <el-carousel-item v-for="item in forecastday" :key="item">
                            <img :src="item && item.day.condition && item.day.condition.icon " style="width: 100px;">
                            <h4 text="12px" justify="center" >{{ item && item.day.condition && item.day.condition.text  }}</h4>
                            <h4 text="12px" justify="center" >{{ item && item.day.mintemp_c }}&deg;C - {{ item && item.day.maxtemp_c }}&deg;C</h4>
                            <h4 text="12px" justify="center" >{{ item && item.day.avgvis_km }}km</h4>
                            <h4 text="12px" justify="center">{{ item.date }}</h4>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
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
import { Line, Bar, Doughnut } from 'vue-chartjs'
import dashboard from './Sidebar.vue'
import { defineComponent, ref } from 'vue';
// import weatherChart from '../common/weather_chart'
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

export default defineComponent({
    name: 'dashboard.weather',
    data() {
        return {
            weather: {},
            searchCountry: '',
            searchOption: '',
            forecastday: [],
            hours: {},
            temp_c_values: '',
            temp_f_values: '',
            hourArray: '',
            // weatherChart: weatherChart,
            isLoading: false,
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: "Celsius temperature",
                        data: [],
                        backgroundColor: "rgba(244, 231, 4, 0.8)",
                        borderColor: "#f4e704cc",
                        borderWidth: 2,

                    },
                    {
                        label: "Fahrenheit temperature ",
                        data: [],
                        backgroundColor: "rgba(71, 183,132,.5)",
                        borderColor: "#47b784",
                        borderWidth: 2,

                    }
                ]
            },
            options: {
                responsive: true,
                lineTension: 1,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Hours'
                        },
                        ticks: {
                            beginAtZero: true,
                            padding: 0,
                        },
                        Width: 600
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Temperature'
                        },
                        min: 0,
                        max: 150,
                        ticks: {
                            stepSize: 10,
                            padding: 0,
                        },

                    }
                }
            },
        }
    },
    components: {
        dashboard,
        Line,
        Bar
    },
    computed: {
        weatherChart() {
            return {
                chartData: this.chartData,
                options: this.options
            };
        }
    },
    methods: {
        async getWeather() {
            var API_PERSON_KEY = `607d30125c34472888023252233105`
            var API_WEATHER = `http://api.weatherapi.com/v1/${this.searchOption}?key=${API_PERSON_KEY}&q=${this.searchCountry}&days=7&aqi=no`

            try {
                this.isLoading = true
                const response = await fetch(API_WEATHER);
                if (response.status === 200) {
                    this.weather = await response.json()
                    if (this.searchOption === 'forecast.json') {
                        this.forecastday = this.weather.forecast.forecastday
                        this.forecastday.forEach(element => {
                            this.hours = element.hour
                        })
                        this.temp_c_values = this.hours.map(item => item.temp_c);
                        this.temp_f_values = this.hours.map(item => item.temp_f);
                        let time_values = this.hours.map(item => item.time);
                        this.hourArray = time_values.map(time => {
                            const date = new Date(time);
                            return date.getHours();
                        });

                        this.chartData.labels = this.hourArray;
                        this.chartData.datasets[0].data = this.temp_c_values;
                        this.chartData.datasets[1].data = this.temp_f_values;
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.isLoading = false
            }

        },
    },

    async mounted() {
        await this.getWeather();
    },

})
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>