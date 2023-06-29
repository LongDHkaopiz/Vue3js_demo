<template>
    <!-- <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="4" v-if="$store.state.email" @click="logout()">
            <router-link to="/admin/sign-in" style="padding-left: 200px">Logout</router-link>
        </el-menu-item>
    </el-menu> -->
    <div class="wrapper">
        <nav id="sidebar">
            <div class="sidebar-header">
                <img src="../../../assets/img/admin.jpeg" alt="" class="admin-manage">
            </div>

            <ul class="list-unstyled components">
                <li>
                    <router-link to="/admin/dashboard">Dashboard</router-link>
                </li>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
                        class="dropdown-toggle">Management</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <router-link to="/admin/users">User</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/products">Product</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link
                        :to="{ name: 'admin.profile', params: { id: '883DC843E34AA1CC639C763B1916B' } }">Profile</router-link>
                </li>
                <li>
                    <router-link to="/admin/dashboard/weather">Weather</router-link>
                </li>
                <li>
                    <router-link to="/admin/dashboard/country">Country</router-link>
                </li>
                <li>
                    <router-link to="/admin/dashboard/anime-image">Image Anime</router-link>
                </li>
                <li>
                    <router-link to="/admin/dashboard/story-page">Story Page</router-link>
                </li>
                <li>
                    <router-link to="/admin/dashboard/news">News</router-link>
                </li>
                <li>
                    <router-link to="/admin/dashboard/search-by-google">Search By Google</router-link>
                </li>
            </ul>
            <el-switch v-model="value2" class="ml-2" style="--el-switch-on-color: #222;" @change="toggleDarkMode"
                inline-prompt active-icon="CircleCheck" inactive-icon="Close" />

            <div class="logout-admin">
                <router-link v-if="!$store.state.email" to="/admin/sign-in">
                    Login
                </router-link>
                <router-link v-if="$store.state.email" to="/admin/sign-in" @click="logout()">
                    <font-awesome-icon icon="fa-solid fa-right-from-bracket" fade />Logout
                </router-link>
            </div>
        </nav>
        <div id="content">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="btn btn-info">
                        <font-awesome-icon icon="fa-solid fa-bars" />
                    </button>

                </div>
            </nav>
        </div>
    </div>
</template>
<script>
// import { ref } from 'vue'
// const value2 = ref(false)
import { Check, Close } from '@element-plus/icons-vue'
export default {
    name: "dashboard",
    data() {
        return {
            user: [],
            value2: false
        }
    },
    computed: {
        value2: {
            get() {
                return this.$store.state.switchOn;
            },
            // set(value) {
            //     this.$store.commit("setSwitchOn", value);
            // }
        },
    },
    mounted() {
        this.$store.commit("initialiseStore");
        // if (this.$store.state.switchOn) {
        //     this.toggleDarkMode()
        // }
    },
    methods: {
        logout() {
            this.$store.commit("logout");
        },
        toggleDarkMode() {
            var back = document.body.classList.toggle('dark-mode');
            this.$store.commit("setSwitchOn", back);
        },
    },
    setup() {
        $(document).ready(function () {

            $("#sidebar").mCustomScrollbar({
                theme: "minimal"
            });

            $('#sidebarCollapse').on('click', function () {
                // open or close navbar
                $('#sidebar').toggleClass('active');
                // close dropdowns
                $('.collapse.in').toggleClass('in');
                // and also adjust aria-expanded attributes we use for the open/closed arrows
                // in our CSS
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });

        });
    },

};
</script>

<style>
.dark-mode {
    background-color: darkgray;
    color: white;
}

body {
    transition: background-color 1.5s ease-in-out;
}
</style> 