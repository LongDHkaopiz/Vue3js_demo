<template>
    <div class="product-list mb-5">
        <div class="container">
            <div class=" d-flex justify-content-beweent princing-header py-3 pt-md-3 pb-md-4 mx-auto text-center ">
                <h2 class="display-4">Product Management</h2>
                <button class="btn btn-primary create-new float-right ">
                    <router-link to="/admin/products/create-new" class="text-white"> Create New</router-link>
                </button>
            </div>

            <!-- <div class="product-items  table-wrapper-scroll-y my-custom-scrollbar mb-3 text-center ">
                <table class="table table-fixed table-bordered table-striped mb-0" width="100%">
                    <thead style="position: sticky; top: 0">
                        <tr>
                            <th scope="col">Stt</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody style="max-height: 200px; overflow-y: scroll">
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
            </div> -->
            <span>Border: <el-switch v-model="parentBorder" /></span>
            <el-table :data="products" style="width: 100%" height="530" :border="parentBorder">
                <el-table-column fixed type="index" label="STT" width="60" />
                <el-table-column prop="image" label="Image" width="120">
                    <template #default="{ row }">
                        <img :src="row.image" style="width:80px">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="Name" width="210" />
                <el-table-column prop="price" label="Price" width="150" :sort-by="'price'" :sortable="true"
                    :formatter="(row) => `${row.price} VND`" :type="'number'">
                    <!-- <template #default="{ row }">
                        <span>{{ row.price }} VND</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="description" label="Description" width="460" />
                <el-table-column label="Operations" width="180" prop="id" fixed="right">
                    <template #default="{ row }">
                        <el-button type="danger" size="big" @click="onDelete(row.id)"
                            style="margin-right: 10px;">Delete</el-button>
                        <router-link :to="{ name: 'product.update-product', params: { id: row.id } }">
                            <el-button type="primary" size="big">Edit</el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>

        </div>

    </div>
</template>
<script>
import { API_PRODUCT } from '../common/contants'
export default {
    name: "ProductList",
    data() {
        return {
            products: [],
            parentBorder: false
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



