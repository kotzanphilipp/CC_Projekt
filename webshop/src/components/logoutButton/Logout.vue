<template>
  <button v-if="email != empty" @click="handleClick">
    LOGOUT
  </button>
</template>

<script>
import firebase from "firebase";
import useSession from "@/service/SessionStore";

export default {
  name: "LogoutButton",
  setup() {
    const { email, resetSession } = useSession();
    const empty = "";

    function logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out");
        });
    }

    function handleClick() {
      logout();
      resetSession();
      console.log("email:" + email.value);
    }

    return { email, handleClick, empty };
  },
};
</script>
