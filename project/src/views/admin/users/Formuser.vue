<template>
    <div class="user-info">
        <div class="princing-header px-3 py-3 pt-md-3 pb-md-4 mx-auto text-center">
            <h3 class="display-4">Create New User</h3>
        </div>
        <div class="container">
            <form @submit.prevent="save()">
                <div class="form-item row py-3">
                    <label for="input" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-9">
                        <input type="email" v-model="user.email" @blur="validate()" class="form-control" />
                    </div>
                </div>
                <div class="form-item row py-3">
                    <label for="input" class="col-sm-3 col-form-label">Name</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" v-model="user.name" @blur="validate()" />
                    </div>
                </div>
                <div class="form-item row py-3">
                    <label for="input" class="col-sm-3 col-form-label">Password</label>
                    <div class="col-sm-9">
                        <input type="password"  class="form-control" minlength="8" v-model="user.password"
                            @blur="validate()" required />
                    </div>
                </div>
                <div class="form-item row py-3">
                   <label for="input" class="col-sm-3 col-form-label">Role</label>
                   <div class="col-sm-9">
                        <select v-model="user.role" @blur="validate()" class="form-control">
                            <option disabled value="">Please select one</option>
                            <option>admin</option>
                            <option>user</option>
                        </select>
                   </div>
                    
                </div>
    
                <div class="form-item row py-3">
                    <label for="input" class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9">
                        <button type="submit" class="btn btn-primary mx-3 ">Save</button>
                        <button type="reset" class="btn btn-danger mx-3 ">Cancel</button>
                        <button class="btn btn-secondary mx-3">
                            <router-link to="/admin/users" class="text-white">Back</router-link>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { API_USER } from '../common/contants'
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
            }else if (!this.user.email) {
                this.errors.email = 'User email is required'
                isValid = false
            }else if (!this.user.password) {
                this.errors.password = 'User password is required'
                isValid = false
            }
            return isValid
        },
        save() {
            if (this.validate()) {
                if (this.user.id) {
                    this.$request.put(API_USER + `/${this.user.id}`, this.user).then(
                        res => {
                            if (res.data.success) {
                                this.$router.push({
                                    name: 'user.list'
                                })
                                return
                            }
                            alert('Something went wrong')
                        }
                    )
                } else {
                    this.$request.post(API_USER, this.user).then(
                        res => {
                            if (res.data.success) {
                                this.$router.push({
                                    name: 'user.list'
                                })
                                return
                            }
                            alert('Something went wrong')
                        }
                    )
               }
            }
        },
        getUser(Userid) {
            this.$request.get(API_USER + `/${Userid}`).then((result) => {
                this.user = result.data
            }).catch((err) => {
                alert(err)
            });
        },
        cancel() {
            this.user = {
                name: "",
                email: "",
                password: "",
            }
        }
    }

}
</script>