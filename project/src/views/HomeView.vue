<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"> 
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  metaInfo: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', async: true, defer: true },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.7/umd/popper.min.js', async: true, defer: true },
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js', async: true, defer: true },
      { src: 'https://static.cloudflareinsights.com/beacon.min.js/v52afc6f149f6479b8c77fa569edb01181681764108816', async: true, defer: true },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.sticky/1.0.4/jquery.sticky.min.js', async: true, defer: true },
      { src: 'https://static.cloudflareinsights.com/beacon.min.js/v52afc6f149f6479b8c77fa569edb01181681764108816', async: true, defer: true },
      { src: '/cdn-cgi/zaraz/s.js?z=JTdCJTIyZXhlY3V0ZWQlMjIlM0ElNUIlNUQlMkMlMjJ0JTIyJTNBJTIyRm9vdGVyJTIwMDElMjIlMkMlMjJ4JTIyJTNBMC44NDk3MjE5NDYzMTk4MjkxJTJDJTIydyUyMiUzQTE0NDAlMkMlMjJoJTIyJTNBMTAwMiUyQyUyMmolMjIlM0ExMDAyJTJDJTIyZSUyMiUzQTE0NDAlMkMlMjJsJTIyJTNBJTIyaHR0cHMlM0ElMkYlMkZwcmV2aWV3LmNvbG9ybGliLmNvbSUyRnRoZW1lJTJGYmZ0JTJGYm9vdHN0cmFwLWZvb3Rlci0wMSUyRiUyMiUyQyUyMnIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRmNvbG9ybGliLmNvbSUyRiUyMiUyQyUyMmslMjIlM0EyNCUyQyUyMm4lMjIlM0ElMjJVVEYtOCUyMiUyQyUyMm8lMjIlM0EtNDIwJTJDJTIycSUyMiUzQSU1QiU1RCU3RA==', async: true, defer: true },
      { src: '../assets/js/script.js' },
      { src: 'https://w.ffwant.com/vue-admin-template-plus/static/js/chunk-c301f518.43c6f873.js' },
      { src: 'https://w.ffwant.com/vue-admin-template-plus/static/js/app.ab2a988c.js' },
      { src: 'https://w.ffwant.com/vue-admin-template-plus/static/js/chunk-libs.250b712b.js' },
    ],
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,300;1,400&display=swap');
@import url('https://w.ffwant.com/vue-admin-template-plus/static/css/chunk-libs.05695478.css');
@import url('https://w.ffwant.com/vue-admin-template-plus/static/css/app.a3dbfdb7.css');
@import url('https://w.ffwant.com/vue-admin-template-plus/static/css/chunk-c301f518.eda770dd.css');
@import '../assets/css/main.css';
</style>


