<template>
    <div class="product-list">
        <div class="princing-header px-3 py-3 pt-md-3 pb-md-4 mx-auto text-center">
            <h2 class="display-4">User Management</h2>
        </div>
        <div class="container">
            <div class="product-items mb-3 text-center">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Stt</th>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody :key="index" v-for="(user, index) in users">
                        <tr>
                            <td scope="col"> {{ index }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.name }}</td>
                            <!-- <td>{{ user.password }}</td> -->
                            <!-- <td>
                                <div class="input-group">
                                    <input v-bind:type="showPassword ? 'text' : 'password'" class="form-control"
                                        v-bind:value="user.password" disabled />
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="showPassword = !showPassword">
                                        {{ showPassword ? 'Hide' : 'Show' }}
                                    </button>
                                </div>
                            </td> -->
                            <td>
                                <div class="input-group">
                                    <input :type="showPassword[index] ? 'text' : 'password'" class="form-control"
                                        :value="user.password" disabled />
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="toggleShowPassword(index)">
                                        <View v-if="showPassword[index]" style="width: 1em;" />
                                        <Hide v-else style="width: 1em;" />
                                        <!-- <Edit style="width: 1em; height: 1em; margin-right: 8px" /> -->
                                    </button>
                                </div>
                            </td>
                            <td>{{ user.role }}</td>
                            <td>
                                <button class="btn btn-danger mx-1" @click="onDelete(user.id)">Delete</button>
                                <router-link :to="{ name: 'user.update-user', params: { id: user.id } }">
                                    <button class="btn btn-success mx-1">Edit</button>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="btn btn-primary create-new float-right ">
                <router-link to="/admin/users/create-new" class="text-white"> Create New</router-link>
            </button>
        </div>


    </div>
</template>


<script>
import { API_USER } from '../common/contants'
import md5 from '../common/md5'
export default {
    name: "userlist",
    data() {
        return {
            users: [],
            showPassword: []
        }
    },
    // props: {
    //     index: {
    //         type: Number,
    //         required: true,
    //     },
    //     user: {
    //         type: Object,
    //         required: true,
    //     },
    // },
    mounted() {
        // initialize the showPassword array with 'false' values for each user
        this.showPassword = new Array(this.users.length).fill(false)
    },
    created() {
        this.getAllUser()
    },
    methods: {
        getAllUser() {
            this.$request.get(API_USER).then((result) => {
                this.users = result.data
            }).catch((err) => {
                alert(err)
            });
        },
        onDelete(Userid) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$request.delete(API_USER + `/${Userid}`).then((result) => {
                        if (result.data.success) {
                            this.getAllUser()
                            this.$swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    }).catch((err) => {
                        alert(err)
                    });
                }
            })
        },
        toggleShowPassword(index) {
            // toggle the show/hide status of the password input at the given index
            this.showPassword[index] = !this.showPassword[index]
        },
    }
}
</script>