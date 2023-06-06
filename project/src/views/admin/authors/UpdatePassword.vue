<template>
    <div class="d-flex justify-content-center form_container">
        <form @submit.prevent="handePassword()">
            <div class="input-group mb-3">
                <div class="input-group-append">
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" v-model="user.password" class="form-control input_pass" placeholder="new password">
            </div>
            <div class="form-item row py-3">
                <div class="col-sm-9">
                    <button type="submit" class="btn btn-primary" style="margin-left: 56px;">Submit</button>
                </div>
            </div>
           
        </form>
    </div>
</template>
<script>
import { API_USER, API_FORGOT_PASS } from '../common/contants'
export default {
    name: "UserForm",
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
            },
           errors: {
                name: "",
                email: "",
                password: "",
            }
        }
    },
    created() {
        let userId = this.$route.params.id
        if (userId) {
            this.getUser(userId)
        }
    },
    methods: {
        getUser(Userid) {
            this.$request.get(API_USER + `/${Userid}`).then((result) => {
                this.user = result.data
            }).catch((err) => {
                alert(err)
            });
        },
        handePassword() {
            this.$request.put(API_USER + `/${this.user.id}`, this.user).then(
                res => {
                    if (res.data.success) {
                        this.$router.push({
                            name: 'admin.sign-in'
                        })
                        return
                    }
                    alert('Something went wrong')
                }
            )
        },

    }
}
</script>