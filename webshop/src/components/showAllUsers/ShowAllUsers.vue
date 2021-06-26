<template>
  <div>
    <router-link to="/admin" class="deco-none">
      <button>zurück</button>
    </router-link>
    <h1>Alle Users anzeigen</h1>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Telefonnummer</th>
          <th>Adresse</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="(nutzer, index) in nutzern" v-bind:key="nutzer.email">
        <tr>
          <td></td>
          <td>{{ nutzer.vorname }}</td>
          <td>{{ nutzer.nachname }}</td>
          <td>{{ nutzer.telefonnummer }}</td>
          <td>{{ nutzer.adresse }}</td>
          <td>
            <a @click="deleteNutzer(nutzer, index)" class="btn btn-danger">
              Löschen
            </a>
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
  name: "ShowAllUsers",
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
  },
};
</script>
