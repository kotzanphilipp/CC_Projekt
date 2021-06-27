<template>
  <div class="login">
    <div class="container-center">
      <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <div class="form-group-signin">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="credentials.email"
            name="email"
            placeholder="hello@test.de"
            size="30"
          />
        </div>
        <div class="form-group-signin">
          <label for="password">Passwort</label>
          <input
            type="password"
            class="form-control"
            v-model="credentials.password"
            name="password"
            placeholder="***"
            size="30"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="login">Login</button>
          <button class="btn btn-secondary" @click="signUp">SignUp</button>
        </div>
        <small class="text-regular red smaller" v-show="responseMessage.show">{{
          responseMessage.message
        }}</small>
      </form>
    </div>
  </div>
</template>

<script>
import useSession from "@/service/SessionStore";
//import axios from "axios";
import router from "@/router/index";
import { reactive } from "vue";
//import { Endpoint } from "@/constants/Endpoint";
import { Path } from "@/constants/Path";
import firebase from "firebase";

export default {
  name: "Login",
  setup() {
    const { setEmail, setId, setToken, email } = useSession();

    const credentials = reactive({
      email: "",
      password: "",
    });

    const responseMessage = reactive({
      message: "",
      show: true,
    });

    async function login() {
      /*
      await axios
        .post(Endpoint.LOGIN, credentials)
        .then((response) => {
          const data = response.data;
          createSession(data.token, data.role, data.email);
          router.push(Path.HOME);
        })
        .catch((error) => {
          if (error.response) {

             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx

            responseMessage.message = "Login fehlgeschlagen";
            responseMessage.show = true;
            throw new Error(error);
          } else if (error.request) {

             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js

            window.alert(error.request);
            throw new Error(error.request);
          } else {
            // Something happened in setting up the request and triggered an Error
            window.alert(error.message);
            throw new Error(error.message);
          }
        }); */

      const email = credentials.email.toString().trim();
      firebase
        .auth()
        .signInWithEmailAndPassword(email, credentials.password)
        .then((cred) => {
          setEmail(cred.user.email)
          setId(cred.user.id)
          return cred.user.getIdToken()})
        .then(idToken => {
          setToken(idToken);
          router.push(Path.HOME);
        })
    }

    function signUp() {
      router.push(Path.SIGNUP);
    }

    return {
      email,
      credentials,
      responseMessage,
      login,
      signUp
    };
  },
};
</script>

<style>
.form-group-signin {
  text-align: left;
  margin-top: 8%;
  margin-bottom: 8%;
}
</style>
