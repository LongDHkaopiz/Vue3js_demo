<template>
  <nav>
    <router-link to="/">
      <el-icon>
        <Monitor />
      </el-icon>
    </router-link> |
    <router-link to="/about">
      <el-icon>
        <Operation />
      </el-icon>
    </router-link>
    <router-link v-show="$route.path !== '/admin/sign-in' && $route.path !== '/user'" to="/admin/dashboard">|
      <el-icon>
        <House />
      </el-icon>
    </router-link>
    <div class="logout-admin" v-if="this.$route.params.role === 'user'">
      <router-link v-if="!$store.state.email" to="/admin/sign-in">
        Login
      </router-link>
      <router-link v-if="$store.state.email" to="/admin/sign-in" @click="logout()" style="color: #2c3e50;">
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" fade />Logout
      </router-link>
    </div>
  </nav>
  <!-- <div class="container">
      <div class="d-flex flex-column flex-md-row align-item-center justify-content-between p-3 px-md-4 mb-3 bg-white">
        <h4 class="my-4 mr-md-1  font-weigth-normal">
           <router-link to="/">Vue Mini Project Demo</router-link>
        </h4>
        <nav class="my-2 my-md-0 mr-md-3">
          <router-link to="/products" class="mr-2"> Product Management</router-link>
          <a class="display-contracter p-2 text-dark" href="#"> Product Management</a>
          <router-link to="/users">User Management </router-link>
          
          <router-link to="/login">Login </router-link>
        </nav>
        <a href="#" class="btn btn-outline-primary"> Admin</a>
      </div>
    
     
    </div> -->
  <router-view />
</template>

<script>
export default {
  mounted() {
    this.$store.commit("initialiseStore");
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
  },

}
</script>
