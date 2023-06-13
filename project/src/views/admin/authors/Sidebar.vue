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
                    <router-link to="/admin/dashboard/anime">Anime</router-link>
                </li>
                <li>
                     <router-link to="/admin/dashboard/search-by-google">Search By Google</router-link>
                </li>
            </ul>
            <div class="logout-admin" >
                <router-link  v-if="!$store.state.email" to="/admin/sign-in">
                      Login
                </router-link>
                <router-link  v-if="$store.state.email" to="/admin/sign-in" @click="logout()">
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

export default {
    name: "dashboard",
    data() {
        return {
            user: []
        }
    },
    mounted() {
        this.$store.commit("initialiseStore");
    },
    methods: {
        logout() {
            this.$store.commit("logout");
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
