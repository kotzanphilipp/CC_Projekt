<template>
  <div class="users">
    <h1>Users</h1>
    <table class="table">
      <thead>
        <tr>
          <th>vorname</th>
          <th>nachname</th>
          <th>telefonnummer</th>
        </tr>
      </thead>
      <tbody v-for="(nutzer, index) in nutzern" v-bind:key="nutzer.email">
        <tr>
          <td>{{ nutzer.vorname }}</td>
          <td>{{ nutzer.nachname }}</td>
          <td>{{ nutzer.telefonnummer }}</td>
          <td @click="deleteNutzer(nutzer, index)" class="btn btn-danger">
            Löschen
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { onBeforeMount, reactive } from "vue";

export default {
  name: "User",
  setup() {
    let nutzern = reactive([]);
    onBeforeMount(() => {
      fetchUsers();
    });
    async function fetchUsers() {
      await axios
        .get("https://europe-west3-webshop-316612.cloudfunctions.net/users")
        .then(function(response) {
          nutzern.push(...response.data);
          console.log(nutzern);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    async function deleteNutzer(nutzer, index) {
      console.log("nutzer_Email: " + nutzer.email);
      axios
        .delete(
          "https://europe-west3-webshop-316612.cloudfunctions.net/nutzerinfo/delete/" +
            nutzer.email
        )
        .then(function() {
          nutzern.splice(index, 1);
          console.log;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    return { nutzern, deleteNutzer };
  }
};
</script>
