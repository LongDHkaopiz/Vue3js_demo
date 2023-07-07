<template>
    <div id="app">
        <h1>Welcome to our E-commerce Store!</h1>
        <div class="products">
            <!-- Product 1 -->
            <div class="product">
                <img src="product1.jpg" alt="Product 1">
                <h3>Product 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>$9.99</p>
                <button @click="addToCart('Product 1', 9.99)">Add to Cart</button>
            </div>

            <!-- Product 2 -->
            <div class="product">
                <img src="product2.jpg" alt="Product 2">
                <h3>Product 2</h3>
                <p>Nulla facilisi. Mauris bibendum massa sit amet semper.</p>
                <p>$19.99</p>
                <button @click="addToCart('Product 2', 19.99)">Add to Cart</button>
            </div>

            <!-- Add more products here -->
        </div>

        <div class="cart">
            <h2>Cart</h2>
            <ul id="cart-items">
                <!-- Cart items will be dynamically added here -->
            </ul>
            <p id="total-price">Total Price: $0.00</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'homepage',
    data() {
        return {
            cartItems: []
        }
    },
    methods: {
        addToCart(productName, price) {

            const item = { name: productName, price: price };
            this.cartItems.push(item);
            this.updateCart();
        },

        updateCart() {
            const cartList = document.getElementById("cart-items");
            const totalPriceElement = document.getElementById("total-price");
            let totalPrice = 0;

            // Clear previous items in the cart
            cartList.innerHTML = "";

            // Loop through the cart items and add them to the list
            this.cartItems.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                cartList.appendChild(li);
                totalPrice += item.price;
            });

            totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        }
    }
}
</script>