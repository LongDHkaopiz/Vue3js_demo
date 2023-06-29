<template>
    <div class="main-profile d-flex">
        <dashboard></dashboard>
        <div class="container">
            <div class="admin-header">
                <h3>Administration</h3>
            </div>
            <div class="content d-flex">
                <div class="left-content">
                    <ul>
                        <li class="admin-email">
                            Emai: <a :href="'mailto:' + user.email">{{ user.email }}</a>
                        </li>
                        <li class="admin-name">
                            Name: <a href="#">{{ user.name }}</a>
                        </li>
                        <li class="admin-phone">
                            Phone: <a :href="'tel:+' + '0957146527'">0957146527</a>
                        </li>
                    </ul>
                </div>
                <div class="right-content">
                    <img src="../../../assets/img/admin.jpeg" alt="" class="admin-manage" style="width: 200px;">
                </div>
            </div>
            <div class="content-bottom py-5">
                <span>This is administration page </span>
            </div>
        </div>
    </div>
</template>
<script>
import dashboard from './Sidebar.vue'
import { API_USER } from '../common/contants'
export default {
    data() {
        return {
            user: []
        }
    },
    components: {
        dashboard
    },
    methods: {
        getUser(userId) {
            this.$request.get(API_USER + `/${userId}`).then((result) => {
                this.user = result.data
            }).catch((err) => {
                alert(err)
            });
        }
    },
    created() {
        let userId = this.$route.params.id
        if (userId) {
            this.getUser(userId)
        }
    },
}
</script>