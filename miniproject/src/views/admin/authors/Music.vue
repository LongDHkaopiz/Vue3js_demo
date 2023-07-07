<template>
    <div class="d-flex">
        <dashboard> </dashboard>
        <div class="container" style="margin-top: 50px; margin-bottom: 50px;">
            <el-form :model="form" label-width="120px" class="d-flex justify-content-around">
                <el-form-item label="Search By" required>
                    <el-input v-model="q" />
                </el-form-item>
                <!-- <el-form-item label="Type">
                    <el-radio-group v-model="type">
                        <el-radio label="album" />
                        <el-radio label="artist" />
                        <el-radio label="playlist" />
                        <el-radio label="track" />
                        <el-radio label="show" />
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" :disabled="isSearchEnabled" @click="getSpotify">Search</el-button>
                </el-form-item>
            </el-form>
            <div class="music-content-main">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="item in results" :key="item.id" style="margin-bottom: 15px;">
                        <el-link :href="formatSpotifyUrl(item.uri)" target="_blank">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                <img :src="item.images[1].url" class="image" />
                                <div style="padding: 14px">
                                    <span><strong style="-webkit-line-clamp: 1;
                                            -webkit-box-orient: vertical;
                                            display: -webkit-box;
                                            margin: 12px 0;
                                            overflow: hidden;
                                            padding: 0;
                                            word-break: break-word;">{{ item.name }}</strong></span>
                                    <div class="description">
                                        <p style="-webkit-line-clamp: 2;
                                            -webkit-box-orient: vertical;
                                            display: -webkit-box;
                                            margin: 12px 0;
                                            overflow: hidden;
                                            padding: 0;
                                            word-break: break-word;">
                                            {{ item.description }}
                                        </p>
                                    </div>
                                    <div class="bottom">
                                        <time class="time">{{ currentDate }}</time>
                                        <el-button text class="button">{{ currentTime }}</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-link>
                    </el-col>
                </el-row>
            </div>
        </div>

    </div>
</template>
<script>
import dashboard from './Sidebar.vue'
import { API_RAPIDAPI_KEY } from '../common/contants'
export default {
    name: 'admin.music',
    components: {
        dashboard
    },
    data() {
        return {
            q: '',
            results: '',
            currentDate: new Date().toISOString().split("T")[0],
            currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
        }
    },
    methods: {
        async getSpotify() {
            const url = `https://spotify-data-api1.p.rapidapi.com/search?query=${this.q}&types=show&limitSearchResults=20&offset=0`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': API_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': 'spotify-data-api1.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                this.results = result[0].items
            } catch (error) {
                console.error(error);
            }
        },
        formatSpotifyUrl(uri) {
            return 'https://open.spotify.com/show/' + uri.split(":")[2].replace(':', '/');
        }
    },
    computed: {
        isSearchEnabled() {
            return !(
                this.q
            );
        }
    },
}
</script>
<style>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
    height: 228.75px;
}

.el-link.is-underline:hover:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 0;
    bottom: 0;
    border-bottom: 0;
}

.el-link.el-link--default:after {
    border-color: #606266;
}

a:hover {
    text-decoration: none;
}

element.style {
    width: 450px;
}

.el-form-item__content {
    max-width: 450px;
}
</style>