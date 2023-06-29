<template>
    <div class="container">
        <div class="h-6" />
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" v-if="!$store.state.email">
                <router-link to="/admin/sign-in"> Login</router-link>
            </el-menu-item>
            <el-menu-item index="4" v-if="$store.state.email" @click="logout()">Logout</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
// import { ref } from 'vue'
// export default {
//     mounted() {
//         this.$store.commit('initialiseStore')
//     },
//     methods: {
//         logout() {
//             this.$store.commit('logout')
//         }

//     },
// }
// </script>
