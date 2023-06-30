<template>
    <div class="container h-100" style="margin-top: 150px;">
        <div class="d-flex justify-content-center h-100">
            <div class="user_card">
                <div class="d-flex justify-content-center">
                    <div class="brand_logo_container">
                        <img src="../../../assets/img/pxfuel.jpg" class="brand_logo" alt="Logo">
                    </div>
                </div>
                <div class="d-flex justify-content-center form_container">
                    <form @submit.prevent="save()">
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <el-icon>
                                        <Avatar />
                                    </el-icon>
                                </span>
                            </div>
                            <input type="text" v-model="user.name" class="form-control input_user" placeholder="username">
                        </div>
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
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <el-icon>
                                        <Lock />
                                    </el-icon>
                                </span>
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
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { API_USER } from '../common/contants'
export default {
    name: "SignForm",
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                role: "user"
            },
            errors: {
                name: "",
                email: "",
                password: "",
                role: "user"
            }
        }
    },
    methods: {
        save() {
            this.$swal.fire({
                title: 'Good job!',
                text: "You have successfully registered!",
                icon: 'success'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$request.post(API_USER, this.user).then(
                        res => {
                            if (res.data.success) {
                                this.$router.push({
                                    name: 'admin.sign-in'
                                })
                                return
                            } else {
                                this.$swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                })
                            }
                        }
                    )
                }
            })
        },
    },

}
</script>