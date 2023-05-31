<template>
    <div class="product-list mb-5">
        <div class="container">
            <div class=" d-flex justify-content-beweent princing-header py-3 pt-md-3 pb-md-4 mx-auto text-center ">
                <h2 class="display-4">Product Management</h2>
                <button class="btn btn-primary create-new float-right ">
                    <router-link to="/admin/products/create-new" class="text-white"> Create New</router-link>
                </button>
            </div>

            <div class="product-items  table-wrapper-scroll-y my-custom-scrollbar mb-3 text-center ">
                <table class="table table-fixed table-bordered table-striped mb-0" width="100%">
                    <thead>
                        <tr>
                            <th scope="col">Stt</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(product, index) in products">
                            <td scope="col"> {{ index }}</td>
                            <td><img :src="product.image" style="width:60px"></td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }} VND</td>
                            <td>{{ product.description }}</td>
                            <td>
                                <button class="btn btn-danger mx-1" @click="onDelete(product.id)">Delete</button>
                                <router-link :to="{ name: 'product.update-product', params: { id: product.id } }">
                                    <button class="btn btn-success mx-1">Edit</button>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</template>
<script>
import { API_PRODUCT } from '../common/contants'
export default {
    name: "ProductList",
    data() {
        return {
            products: []
        }
    },
    created() {
        this.getAllProduct()
    },
    methods: {
        getAllProduct() {
            this.$request.get(API_PRODUCT).then((result) => {
                this.products = result.data
            }).catch((err) => {
                alert(err)
            });
        },
        onDelete(Productid) {
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
                    this.$request.delete(API_PRODUCT + `/${Productid}`).then((result) => {
                        if (result.data.success) {
                            this.getAllProduct()
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
    },
}
</script>



