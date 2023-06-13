<template>
    <div class="d-flex">
        <dashboard></dashboard>
        <div class="container list-anime " style=" display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                    justify-content: space-between;
            ">
            <div class="anime-item d-flex" :key="index" v-for="(anime, index) in animes" style="width: calc(100% / 3);">
                <img :src="anime.main_picture.medium" :alt="anime.title" class="img-anime">
                
                <p class="text-overlay">{{ anime.title_english }}</p>
                
            </div>

        </div>
    </div>
</template>
<script>
import dashboard from './Sidebar.vue'
export default {
    name: 'dashboard.anime',
    components: {
        dashboard,
    },
    data() {
        return {
            animes: {}
        }
    },
    methods: {
        async getAllAnime() {
            const url = 'https://animes5.p.rapidapi.com/';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'dde66f0561msh324e6dc8a212669p1f94d2jsna8556e10d67a',
                    'X-RapidAPI-Host': 'animes5.p.rapidapi.com'
                }
            };
            try {
                const response = await fetch(url, options);
                const rest = await response.json();
                this.animes = rest.animes
                console.log(this.animes);
            } catch (error) {
                console.error(error);
            }
        }
    },
    created() {
        this.getAllAnime()
        
    },

}
</script>
<style scoped>
.list-anime {
    margin-bottom: 50px;
    position: relative;
    align-items: center;
}
.text-overlay {
  position: absolute;
  bottom: -88px;
  transform: translateX(39px);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  opacity: 1;
  transition: opacity 0.5s;
  inline-size: 150px;
  overflow-wrap: break-word;
  font-family: monospace;
}
.anime-item {
    overflow: hidden;
    position: relative;
}
.img-anime:hover {
    scale: 1.1;
    position: relative;
    overflow: hidden;
    transition: all 0.9s ease-out;
    cursor: pointer;
}
.anime-item:hover .text-overlay {
    bottom: 120px;
    opacity: 1;
    transform: translateY(50px);
    transition: all 1s ease-out;
    cursor: pointer;
}
</style>
