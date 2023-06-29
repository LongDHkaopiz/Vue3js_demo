<template>
    <div class="d-flex">
        <dashboard></dashboard>
        <div class="container">
            <div class="header-search">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="Search">
                        <el-input v-model="animename" placeholder="Enter name anime" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getAnime()">
                            <Search style="width: 20px; height: 20px;" />
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="main-content">

            </div>
        </div>
    </div>
</template>
<script>
import dashboard from "./Sidebar.vue";
export default {
    name: 'anime.video',
    components: {
        dashboard,
        animename: '',
        animeSearch: [],
        animes: []
    },
    methods: {
        async getAnime() {
            try {
                const url = `https://gogoanime.consumet.stream/search?keyw=naruto`
                const response = await fetch(url);
                this.animeSearch = await response.json();
                console.log(this.animeSearch);
            } catch (error) {
                console.error(error);
            }
        }
    },
    async created() {
        this.getAnime()
    },
}
</script>