<template>
    <div class="d-flex">
        <dashboard></dashboard>
        <div class="main">
            <div class="container">
                <h2>Mot vai trang web truyen tieu bieu</h2>
                <div class="conten-container">
                    <ul>
                        <li><a href="https://www.nettruyenmax.com/"><img
                                    src="https://st.nettruyenmax.com/data/logos/logo-nettruyen.png" alt="Nettruyen"></a>
                        </li>
                        <li><a href="https://nhattruyenmin.com/"><img
                                    src="https://st.nhattruyenmin.com/data/logos/logo-nhattruyen.png" alt="Nhatruyen"></a>
                        </li>
                        <li><a href="https://www.toptruyen68.com/"><img
                                    src="https://www.toptruyen68.com/images/logo/top-truyen.png" alt="Toptruyen"></a></li>
                        <li><a href="https://goctruyentranhvui.com/trang-chu"><img
                                    src="https://goctruyentranhvui.com/contents/images/logo.png" alt="Goctruyentranh"></a>
                        </li>
                        <li><a href="https://www.colamanhua.com/"> <img src="../../../assets/img/logo_story.png"
                                    alt="Raw Manhua"></a></li>
                        <li><a href="https://truyenqqq.vn/"><img
                                    src="https://st.truyenqqq.vn/template/frontend/images/logo-icon.png"
                                    alt="QQ truyen"></a></li>
                        <li><a href="https://blogtruyen.org/"><img
                                    src="https://blogtruyen.org/wp-content/themes/novel/images/spriteimg_new_white_op.png"
                                    alt="Blog truyen"
                                    style=" text-indent: -9999px;white-space: nowrap;outline: none;margin: 5px 5px 0 0;"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dashboard from './Sidebar.vue'
export default {
    name: 'admin.story-page',
    components: {
        dashboard
    }
}
</script>
<style scoped>
.main {
    margin: 50px auto;
}

h2 {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 28px;
    align-items: center;
    text-align: center;
    color: lightseagreen;
    margin: 0 auto;

}

.main .conten-container ul,
li {
    list-style: none;
    margin: 15px auto;
}

img {
    max-width: 200px;
    height: 30px;
}
</style>
