<template>
    <div class="d-flex">
        <dashboard></dashboard>
        <div class="container list-country ">
            <div class="country-item d-flex" :key="index" v-for="(country, index) in countries" >
                <a :href="country.maps.googleMaps">
                    <img :src="country.flags.png" :alt="country.flags.alt" style="width: 150px; height: 90px;">
                </a>
                <span class="country-name">{{ country.name.common }}</span>
                <span class="country-capital">{{ country.capital}}</span>
                <span class="country-population">{{ country.population }} people</span>
                <span class="country-region">{{ country.region }}</span>
                <span class="country-timezones"> {{ country.timezones[0] }}</span>
            </div>
            
        </div>
    </div>
</template>
<script>
import dashboard from './Sidebar.vue'
export default {
    name: 'dashboard.country',
    components: {
        dashboard,
    },
    data() {
        return {
            countries : {}
        }
    },
    methods: {
        async getAllCountry() {
            const res = await fetch('https://restcountries.com/v3.1/all')
            if (res.status === 200) { 
                this.countries = await res.json()
            }
        }
    },
    created() {
        this.getAllCountry()
    },
}
</script>