<template>
  <div>
    <router-link to="/" class="deco-none">
      <button>zurück</button>
    </router-link>
    <h1>Alle Bestellungen</h1>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "vue";

export default {
  name: "ShowAllUsers",
  setup() {
    let cart = reactive([]);
    onBeforeMount(() => {
      readLocalStorageCart();
      console.log(cart);
      /*fetchUsers();*/
    });
    /*function fetchUsers() {
        //TODO
    }*/
    async function readLocalStorageCart() {
      cart.push(...JSON.parse(localStorage["cart"]));
    }
  },
};
</script>
