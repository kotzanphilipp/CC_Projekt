<template>
  <div>
    <router-link to="/" class="deco-none">
      <button>zurück</button>
    </router-link>
    <h1>Alle Bestellungen</h1>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>BestellNr</th>
          <th>Email</th>
          <th>Gesamtpreis</th>
          <th>Produkt</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="(order, index) in orders" v-bind:key="order.email">
        <tr>
          <td></td>
          <td>{{ order.bestellNr }}</td>
          <td>{{ order.email }}</td>
          <td>{{ order.gesamt }}</td>
          <td>{{ order.produkt }}</td>
          <td>
            <a @click="deleteBestellung(nutzer, index)" class="btn btn-danger">
              Löschen
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "vue";
import axios from 'axios';

export default {
  name: "ShowAll",
  setup() {
    let orders = reactive([]);
    onBeforeMount(() => {
      fetchOrders();
    });
    async function fetchOrders(){
      await axios
      .get("https://europe-west3-webshop-316612.cloudfunctions.net/bestellungen")
      .then(function(response){
        orders.push(...response.data);
        console.log(orders);
      })
      .catch(function(error){
        console.log(error);
      });    
    }

    async function  deleteBestellung(order,index) {
      axios.delete("https://europe-west3-webshop-316612.cloudfunctions.net/bestellungen/" + order.bestellNr)
    .then(function(){orders.splice(index,1);
      console.log;})
    .catch(function(error){
      console.log(error);
    })
    }
  
    return {orders,deleteBestellung};
  },
  
};
</script>
