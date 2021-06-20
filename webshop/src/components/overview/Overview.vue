<template>
  <h1>Overview</h1>
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" v-bind:src="imageUrl" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Produkttitel</h5>
      <p class="card-text">Preis: 49,99</p>
      <a @click="addToCart" class="btn btn-primary">Warenkorb legen</a>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {onBeforeMount} from "vue";

export default {
  name: "Overview",
  setup(){
    let products;
    let imageUrl;
    onBeforeMount(() => {
      fetchProducts();
    });
    async function fetchProducts(){
      axios.get("https://europe-west3-webshop-316612.cloudfunctions.net/imageService/getURL?product=iphone3.jpg")
        .then(function (response) {
          imageUrl = response.data;
          console.log(imageUrl);
          console.log(response);
        }).catch(function (error) {
        console.log(error);
      })
    }

    function addToCart(){
      console.log("Product to cart added");
    }

    return {
      fetchProducts,
      addToCart,
      products,
      imageUrl
    };
  }
};
</script>
