<template>
  <div>
    <router-link to="/" class="deco-none">
      <button>zurück</button>
    </router-link>
    <h1>Bestellung abgeschlossen</h1>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "vue";


export default {
  name: "AddOrder",
  setup() {
    let cart = reactive([]);
    onBeforeMount(() => {
      readLocalStorageCart()
      console.log(cart);
      /*fetchUsers();*/
      emptyCart();
    });
    /*function fetchUsers() {
        //TODO
    }*/
    async function readLocalStorageCart() {
      cart.push(...JSON.parse(localStorage["cart"]));
    }

   async function emptyCart(){
      localStorage.removeItem('cart');
    }
  return {
    readLocalStorageCart,
  };
  },
};
</script>
