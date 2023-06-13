<template>
    <div class="d-flex">
        <dashboard></dashboard>
        <div class="container google-search" style="margin-top: 80px;">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="Google Search">
                    <el-input v-model="googlesearch" placeholder="search" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getGoogle()">
                        <Search style="width: 20px; height: 20px;" />
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="content-google-search">
                <a :href="queries.knowledge_panel &&
                    queries.knowledge_panel.image &&
                    queries.knowledge_panel.image.page_url">
                    <img :src="queries.knowledge_panel &&
                        queries.knowledge_panel.image &&
                        queries.knowledge_panel.image.url" alt="Logo">
                </a>
                <p>Name: {{ queries && queries.knowledge_panel && queries.knowledge_panel.name }}</p>
                <div class="search-info" :key="index" v-for="(info, index) in queries.knowledge_panel &&
                    queries.knowledge_panel.info">
                    <p>{{ info.title }}: {{ info.labels[0] }}</p>
                </div>

                <p>Position: {{ queries && queries.knowledge_panel && queries.knowledge_panel.label }} </p>
                <p style="width: 700px; overflow-wrap: break-word; transform: translateX(50px);">{{ queries.knowledge_panel
                    &&
                    queries.knowledge_panel.description &&
                    queries.knowledge_panel.description.text }} </p>
            </div>
            <div class="more-info-google-search" style="width: 800px;">
                <h3 style="font-size: 20px;">More infomation</h3>
                <div class="content-info" :key="index" v-for="(content, index) in queries.results ">
                    <a :href="content.url" target="_blank">
                        <p>{{ content.title }}</p>
                    </a>
                    <p> {{ content.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dashboard from "./Sidebar.vue";
export default {
    name: "dashboard.country",
    components: {
        dashboard,
    },
    data() {
        return {
            googlesearch: '',
            queries: {},
        };
    },
    methods: {
        async getGoogle() {
            const url = `https://google-web-search1.p.rapidapi.com/?query=${this.googlesearch}&limit=2&related_keywords=true`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'dde66f0561msh324e6dc8a212669p1f94d2jsna8556e10d67a',
                    'X-RapidAPI-Host': 'google-web-search1.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                this.queries = await response.json();
                console.log(this.queries);
            } catch (error) {
                console.error(error);
            }
        }
    },
    async created() {
        this.getGoogle()
    },
};
</script>
<style scoped>
.el-form-item__content .el-input {
    width: 500px;
}

.demo-form-inline {
    flex-direction: inherit;
}

.content-google-search {

    width: 800px;
}
</style>
