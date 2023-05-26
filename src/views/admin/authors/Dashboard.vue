<template>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            
        <el-menu-item index="4" v-if="$store.state.email" @click="logout()">
            <router-link to="/admin/sign-in">Logout</router-link>
        </el-menu-item>
    </el-menu>
</template>
<script>
export default {
    mounted() {
        this.$store.commit('initialiseStore')
    },
    methods: {
        logout() {
            this.$store.commit('logout')
        }

    },
}

</script>