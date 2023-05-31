<template>
    <div class=" d-flex">
        <dashboard></dashboard>
        <div class="container weather-today" style="margin-top: 70px;">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="Location by">
                    <el-input v-model="searchCountry" placeholder="Location by" />
                </el-form-item>
                <el-form-item label="Option by" >
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
        </div>
    </div>
</template>
<script>
import dashboard from './Sidebar.vue'

export default {
    name: 'dashboard.weather',
    data() {
        return {
            weather: {},
            searchCountry: '',
            searchOption: '',
        }
    },
    components: {
        dashboard
    },
    methods: {
        async getWeather() {
            var API_PERSON_KEY = `607d30125c34472888023252233105`
            var API_WEATHER = `http://api.weatherapi.com/v1/${this.searchOption}?key=${API_PERSON_KEY}&q=${this.searchCountry}&aqi=no`

            try {
                const response = await fetch(API_WEATHER);
                if (response.status === 200) {
                    this.weather = await response.json();
                    console.log(this.weather)
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
    created() {
        this.getWeather()
    }


}
</script>