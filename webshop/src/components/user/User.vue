<template>
  <div class="user">
    <div class="container-center">
      <form @submit.prevent="handleSubmit">
        <h3>Profil</h3>
        <div class="form-group-signup" style="display: table">
          <div style="display: table-cell">
            <label for="input-vorname">Vorname</label>
            <input
              type="text"
              class="form-control"
              id="input-vorname"
              placeholder="Max"
              size="30"
              disabled="true"
            />
          </div>
          <div style="display: table-cell">
            <label for="input-nachname">Nachname</label>
            <input
              type="text"
              class="form-control"
              id="input-nachname"
              placeholder="Mustermann"
              size="30"
              disabled="true"
            />
          </div>
        </div>
        <div class="form-group-signup" style="display: table">
          <div style="display: table-cell">
            <label for="input-street">Straße und Hausnummer</label>
            <input
              type="text"
              class="form-control"
              id="input-street"
              placeholder="Muster Street"
              size="40"
              disabled="true"
            />
          </div>
          <div style="display: table-cell">
            <label for="input-plz">PLZ</label>
            <input
              type="number"
              class="form-control"
              id="input-plz"
              placeholder="12345"
              disabled="true"
            />
          </div>
        </div>
        <div class="form-group-signup" style="display: table">
          <div style="display: table-cell">
            <label for="input-city">Stadt</label>
            <input
              type="text"
              class="form-control"
              id="input-city"
              placeholder="Wien"
              size="40"
              disabled="true"
            />
          </div>
          <div style="display: table-cell">
            <label for="input-number">Telefonnnummer</label>
            <input
              type="number"
              class="form-control"
              id="input-number"
              placeholder="0173987987"
              disabled="true"
            />
          </div>
        </div>
        <div class="bottom-buttons-container">
          <button class="btn btn-primary" @click="profilBearbeiten">
            Profil bearbeiten
          </button>
          <button class="btn btn-success" @click="Speichern">
            Speichern
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onBeforeMount, reactive } from "vue";

export default {
  name: "User",
  setup() {
    let nutzer = reactive([]);
    onBeforeMount(() => {
      fetchUser();
    });
    async function fetchUser() {
      await axios
        .get(
          "https://europe-west3-webshop-316612.cloudfunctions.net/nutzerinfo/shabo@saliba.de"
        )
        .then(function(response) {
          nutzer.push(...response.data);
          console.log(nutzer);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    function profilBearbeiten() {
      // document.querySelectorAll(".form-control").forEach((element) => {
      //   element.setAttribute("disabled", "false");
      // });
      let input = document.querySelectorAll(".form-control");
      // input.disabled = false;
      input.forEach((element) => {
        element.disabled = false;
      });
    }
    return { profilBearbeiten };
  },
};
</script>
