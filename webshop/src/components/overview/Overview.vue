<template>
  <h1>Overview</h1>
  <div v-for="product in products" v-bind:key="product.id">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" :src="product.produktImageURL" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ product.produktName }}</h5>
        <p class="card-text">{{ product.produktPreis }}</p>
        <a @click="addToCart" class="btn btn-primary">Warenkorb legen</a>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {onBeforeMount, reactive} from "vue";

export default {
  name: "Overview",
  setup(){
    let products = reactive([])

    onBeforeMount(() => {
      fetchProducts().then(function() {
        fetchProductsURL()
        .then(function (){
          console.log("fetching urls done")
        })
      });
    });
    async function fetchProducts(){
      await axios.get("https://europe-west3-webshop-316612.cloudfunctions.net/produkte")
        .then(function (response) {
          products.push(...response.data);
          console.log(products);
        }).catch(function (error) {
        console.log(error);
      })
    }

    async function fetchProductsURL(){
      products.forEach( product => {
        axios.get("https://europe-west3-webshop-316612.cloudfunctions.net/imageService/getURL?product=" + product.produktImage)
              .then(function(response) {
                product.produktImageURL = response.data;
              })
              .catch(function(error) {
                console.log(error);
              })
          });
    }

    function addToCart(){
      console.log("Product to cart added");
    }

    return {
      addToCart,
      products
    };
  }
};
</script>
