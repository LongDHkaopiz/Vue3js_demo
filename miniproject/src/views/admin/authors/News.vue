<template>
    <div class="d-flex">
        <dashboard></dashboard>
        <div class="container" style="position: relative;">
            <el-form :model="form" label-width="120px">
                <el-form-item label="Search By" required>
                    <el-input v-model="search" />
                </el-form-item>

                <el-form-item label="Activity time" required>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="From date" style="width: 100%" v-model="date_from" />
                    </el-col>
                    <el-col :span="2" class="text-center">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-date-picker placeholder="To date" style="width: 100%" v-model="date_to" />
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="isSearchEnabled" @click="getAllNews">Search</el-button>
                </el-form-item>
            </el-form>
            <el-form-item label="Sort By" style="right: 2%;position: absolute; width: 160px;" id="select-option">
                <el-select v-model="sort_by" filterable placeholder="Sort" @change="getAllNews">
                    <el-option label="Default" value="relevancy"></el-option>
                    <el-option label="Date" value="date"></el-option>
                    <el-option label="Rank" value="rank"></el-option>
                    <!-- Thêm các tùy chọn khác tại đây -->
                </el-select>
            </el-form-item>

            <div class="main-content" style="padding-top: 20px;">

                <div class="row" :key="index" v-for="(item, index) in news" style="position: relative;">
                    <div class="news-item">
                        <div class="image">
                            <img :src="item.media" :alt="item.excerpt">
                        </div>
                        <div class="item-content">
                            <h3 class="title"><a :href="item.link">{{ item.title }}</a></h3>
                            <!-- <p class="summary">{{ item.summary }}</p> -->
                            <span class="published_date">{{ item.published_date }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-pagination" style="margin: 50px 0 20px 0;position: absolute;left: 29%;">
                <el-pagination background layout="prev, pager, next" :total="100" :current-page.sync="currentPage"
                    @current-change="handlePaginationChange" />
            </div>

            <!-- totalPages -->
        </div>
    </div>
</template>
<script >
import { API_NEWS, API_NEWS_KEY } from '../common/contants'
import dashboard from './Sidebar.vue'
export default {
    name: 'admin.news',
    components: {
        dashboard,
    },
    data() {
        return {
            news: [],
            search: '',
            date_from: '',
            date_to: '',
            new_date_from: '',
            new_date_to: '',
            page: '',
            sort_by: 'relevancy',
            currentPage: 1,
            totalPages: '',
        }
    },
    methods: {
        async getAllNews() {

            this.new_date_from = this.convertDateTime(this.date_from)
            this.new_date_to = this.convertDateTime(this.date_to)
            const url = API_NEWS + `search?q=${this.search}&from=${this.new_date_from}&to=${this.new_date_to}&lang=en&topic=all&sort_by=${this.sort_by}&page_size=9&page=${this.currentPage}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-api-key': API_NEWS_KEY,
                }
            };
            try {
                const response = await fetch(url, options);
                const rest = await response.json();
                this.news = rest.articles
                this.totalPages = Math.ceil(rest.total_pages / 9);
            } catch (error) {
                console.error(error);

            }
        },
        convertDateTime(value) {
            let dateObj = new Date(value);
            let year = dateObj.getFullYear();
            let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
            let day = ("0" + dateObj.getDate()).slice(-2);
            let formattedDate = `${year}/${month}/${day}`;
            return formattedDate;
        },
        handlePaginationChange(newPage) {
            this.currentPage = newPage;
            this.getAllNews();
        },
    },
    computed: {
        isSearchEnabled() {
            return !(
                this.search &&
                this.date_from &&
                this.date_to
            );
        }
    },
    // created() {

    // },
}
</script>
<style scoped>
.main-content {
    display: flex;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 10px;
}

.row {

    width: 30%;
}

.news-item {
    width: 100%;
}

img {
    width: 100%;
    height: 200px;
    cursor: pointer;
}

.title {
    height: 60px;
}

.title a {
    color: #000;
    text-decoration: none;
    background-color: transparent;
    font-family: 'Times New Roman', Times, serif;
}

.published_date {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 11px;
    font-weight: 600;
    color: white;
    position: absolute;
    right: 2.1%;
    top: 68%;
}

.el-form-item {
    display: flex;
    --font-size: 14px;
    margin-bottom: 18px;
    /* float: left; */
    align-items: baseline;
}
</style>