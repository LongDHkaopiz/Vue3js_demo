<template>
    <div class="container h-100" style="margin-top: 100px;">
        <div class="d-flex justify-content-center h-100">
            <div class="user_card">
                <div class="d-flex justify-content-center">
                    <div class="brand_logo_container">
                        <img src="../../../assets/img/pxfuel.jpg" class="brand_logo" alt="Logo">
                    </div>
                </div>
                <div class="d-flex justify-content-center form_container">
                    <form @submit.prevent="handeEmail()">
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <el-icon>
                                        <Message />
                                    </el-icon>
                                </span>
                            </div>
                            <input type="email" v-model="user.email" class="form-control input_pass" placeholder="email">
                        </div>
                        <div class="form-item row py-3">
                            <div class="col-sm-9">
                                <button type="submit" class="btn btn-primary" style="margin-left: 56px;">Check</button>
                            </div>
                        </div>
                        <!-- <div class="input-group mb-3">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input type="password" minlength="8" v-model="user.password" class="form-control input_pass"
                                    placeholder="password">
                            </div>
                            <div class="input-group mb-3">
                                <input type="hidden" class="form-control input_pass" v-model="user.role">
                            </div>
                            <div class="form-item row py-3">
                                <div class="col-sm-9">
                                    <button type="submit" class="btn btn-primary" style="margin-left: 56px;">Sign Up</button>
                                </div>
                            </div> -->
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { API_USER, API_FORGOT_PASS } from '../common/contants'
export default {
    name: "UserForm",
    data() {
        return {
            user: {
                email: ""
            },
            errors: {
                email: "",
                password: "",
            }
        }
    },
    created() {
        // let userId = this.$route.params.id
        // if (userId) {
        //     this.getUser(userId)

    },
    methods: {
        validate() {
            let isValid = true
            this.errors = {
                name: "",
                price: "",
                description: "",
                image: ""
            }
            if (!this.user.name) {
                this.errors.name = 'User name is required'
                isValid = false
            } else if (!this.user.email) {
                this.errors.email = 'User email is required'
                isValid = false
            } else if (!this.user.password) {
                this.errors.password = 'User password is required'
                isValid = false
            }
            return isValid
        },
        handeEmail() {
            this.$request.post(API_FORGOT_PASS, this.user).then((result) => {
                this.user = result.data.user
                if (this.user) {
                    this.$router.push({
                        name: 'admin.update-password',
                        params: { id: this.user.id }
                    })
                }
                console.log(this.user)
            }).catch((err) => {
                alert(err)
            });
        },

    }
}
</script>