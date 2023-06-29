<template>
    <div class="product-info">
        <div class="princing-header px-3 py-3 pt-md-3 pb-md-4 mx-auto text-center">
            <h3 class="display-4">Create New Product</h3>
        </div>
        <div class="container">
            <form @submit.prevent="save()">
                <div class="form-item row py-3">
                    <label for="input" class="col-sm-3 col-form-label">Product Image</label>
                    <div class="col-sm-9">
                        <input type="text"
                        class="form-control" 
                        v-model="product.image"
                        @blur="vadilate()" 
                        v-bind:class="{'is-invalid': errors.image}"
                        />
                        <div class="invalid-feedback d-flex" v-if="errors.image">{{ errors.image }}</div>
                    </div>
                </div>
                <div class="form-item row py-3">
                    <label for="input" class="col-sm-3 col-form-label">Product Name</label>
                    <div class="col-sm-9">
                        <input type="text" 
                        class="form-control" 
                        v-model="product.name"
                        @blur="vadilate()" 
                        v-bind:class="{ 'is-invalid': errors.name }"
                        />
                        <div class="invalid-feedback d-flex" v-if="errors.name">{{ errors.name }}</div>
                    </div>
                </div>
                <div class="form-item row py-3">
                    <label for="input" class="col-sm-3 col-form-label">Product Price</label>
                    <div class="col-sm-9">
                        <input type="text"
                        class="form-control" 
                        v-model="product.price"
                        @blur="vadilate()" 
                        v-bind:class="{ 'is-invalid': errors.price }"
                        />
                        <div class="invalid-feedback d-flex" v-if="errors.price">{{ errors.price }}</div>
                    </div>
                </div>
                <div class="form-item row py-3">
                    <label for="input" class="col-sm-3 col-form-label">Product Description</label>
                    <div class="col-sm-9">
                        <textarea class="form-control"
                            cols="30" 
                            rows="10" 
                            v-model="product.description"
                            @blur="vadilate()" 
                            v-bind:class="{ 'is-invalid': errors.description }"
                            >
                        </textarea>
                        <div class="invalid-feedback d-flex" v-if="errors.description">{{ errors.description }}</div>
                    </div>
                </div>
                <div class="form-item row py-3">
                    <label for="input" class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9" >
                        <button type="submit" class="btn btn-primary mx-3">Save</button>
                        <button type="reset" class="btn btn-danger mx-3 " @click="cancel()">Cancel</button>
                        <button class="btn btn-secondary mx-3"> 
                            <router-link to="/admin/products" class="text-white">Back</router-link>
                        </button>
                    </div>
                </div>
            </form>
            
        </div>
    </div>
</template>
<script>
import { API_PRODUCT } from '../common/contants'
import dashboard from '../authors/Sidebar.vue'
export default {
    name: "ProductForm",
    components: dashboard,
    data() {
        return {
            product: {
                name: "",
                price: "",
                description: "",
                image: ""
            },
            errors: {
                name: "",
                price: "",
                description: "",
                image: ""
            }

        }
    },
    created() {
        let productId = this.$route.params.id
        if (productId) {
            this.getProduct(productId)
        }

    },
    methods: {
        vadilate() {
            let isValid = true
            this.errors = {
                name: "",
                price: "",
                description: "",
                image: ""
            }
            if (!this.product.image ) {
                this.errors.image = 'Product image is required'
                isValid = false
            }else if (!this.product.name) {
                this.errors.name = 'Product name is required'  
                isValid = false  
            }else if (!this.product.description) {
                this.errors.description = 'Product description is required'
                isValid = false
            }
            if (!this.product.price) {
                this.errors.price = 'Product price is required'
                isValid = false
                
            } else if (!this.isNumber(this.product.price)) {
                this.errors.price = 'Product price must be number'
                isValid = false
            }
            return isValid
        },
        isNumber(number) {
            return !isNaN(parseFloat(number) && isFinite(number));
        },
        save() {
            if (this.vadilate()) {
                if (this.product.id) {
                    this.$request.put(API_PRODUCT + `/${this.product.id}`, this.product).then(
                        res => {
                            if (res.data.success) {
                                this.$router.push({
                                    name: 'product.list'
                                })
                                return
                            }
                            alert('Something went wrong')
                        }
                    )
                } else {
                    this.$request.post(API_PRODUCT, this.product).then(
                        res => {
                            if (res.data.success) {
                                this.$router.push({
                                    name: 'product.list'
                                })
                                return
                            }
                            alert('Something went wrong')
                        }
                    )
                }
            }
        },
        getProduct(Productid) {
            this.$request.get(API_PRODUCT + `/${Productid}`).then((result) => {
                this.product = result.data    
            }).catch((err) => {
                alert(err)
            });
        },
        cancel() {
            this.product = {
                name: "",
                price: "",
                description: "",
                image: ""
            }
        }

    }
}
</script>