<template>
  <div class="signup">
    <h1>SignUp</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="input-email">Email</label>
        <input
          type="email"
          class="form-control single-line"
          id="input-email"
          placeholder="123@test.de"
          v-model="signUpData.email"
        />
      </div>
      <div class="form-group">
        <label for="input-password">Password</label>
        <input
          type="password"
          class="form-control single-line"
          id="input-password"
          placeholder="***"
          v-model="signUpData.password"
        />
      </div>
      <div class="form-group">
        <label for="input-vorname">Vorname</label>
        <input
          type="text"
          class="form-control single-line"
          id="input-name"
          placeholder="Max"
          v-model="signUpData.vorname"
        />
      </div>
         <div class="form-group">
        <label for="input-nachname">Nachname</label>
        <input
          type="text"
          class="form-control single-line"
          id="input-name"
          placeholder="Mustermann"
          v-model="signUpData.nachname"
        />
      </div>
      <div class="form-group">
        <label for="input-street">Street</label>
        <input
          type="text"
          class="form-control single-line"
          id="input-street"
          placeholder="Muster Street"
          v-model="signUpData.street"
        />
      </div>
      <div class="form-group">
        <label for="input-number">number</label>
        <input
          type="text"
          class="form-control single-line"
          id="input-number"
          placeholder="0173987987"
          v-model="signUpData.number"
        />
      </div>
      <div class="form-group">
        <label for="input-plz">PLZ</label>
        <input
          type="number"
          class="form-control single-line"
          id="input-plz"
          placeholder="12345"
          v-model="signUpData.plz"
        />
      </div>
      <div class="form-group">
        <label for="input-city">City</label>
        <input
          type="text"
          class="form-control single-line"
          id="input-city"
          placeholder="Wien"
          v-model="signUpData.city"
        />
      </div>
      <div class="bottom-buttons-container">
        <button class="btn btn-primary" @click="signUp">Register</button>
        <button class="btn btn-secondary" @click="login">To Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { Path } from "@/constants/Path";
import axios from "axios";
import router from "@/router/index";
import { Endpoint } from "@/constants/Endpoint";

//TODO: Validation and Login

export default {
  setup() {
    const signUpData = reactive({
      email: "",
      password: "",
      nachname: "",
      vorname: "",
      street: "",
      number: "",
      plz: "",
      city: ""
    });

    const adress = computed(() => signUpData.street + " " + signUpData.number + " " + signUpData.plz + " " + signUpData.city)

    async function send() {
      await axios
        .post(Endpoint.SIGNUP + "/submit", {
          email: signUpData.email,
          nachname: signUpData.nachname,
          vorname: signUpData.vorname,
          telefonnummer: signUpData.number,
          adresse: adress
        })
        //Handle responses
        .then((response) => {
          const status = response.status;
          if (status == 201) {
            router.push(Path.HOME);
          }
        })
        .catch((error) => {
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            throw new Error(error);
          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            window.alert(error.request);
            throw new Error(error.request);
          } else {
            // Something happened in setting up the request and triggered an Error
            window.alert(error.message);
            throw new Error(error.message);
          }
        });
    }

    function signUp() {
      send();
    }

    function login() {
      router.push(Path.LOGIN);
    }

    return {
      signUpData,
      signUp,
      login
    };
  },
};
</script>
