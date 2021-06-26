<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="navbar-brand">
      <router-link to="/">
        <a>Home</a>
        <!-- <img src="@/assets/logo.svg" class="logo" alt="Logo"/> -->
      </router-link>
    </div>
    <button
      class="navbar-toggler"
      data-toggle="collapse"
      data-target="#navbarMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarMenu">
      <ul class="navbar-nav" id="navbar-ul">
        <li class="nav-item">
          <router-link to="/overview" class="deco-none">
            <a class="nav-link">Artikelübersicht</a>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/user" class="deco-none">
            <a class="nav-link">Konto</a>
          </router-link>
        </li>

        <li>
          <router-link to="/login" class="deco-none">
            <a class="nav-link">Login</a>
          </router-link>
        </li>

        <li>
          <router-link to="/shoppingcart" class="deco-none">
            <a class="nav-link">Warenkorb</a>
          </router-link>
        </li>

        <li>
          <router-link to="/standort" class="deco-none">
            <a class="nav-link">Standort</a>
          </router-link>
        </li>

        <li>
          <LogoutButton />
        </li>

      </ul>
    </div>
  </nav>
</template>

<script>
import LogoutButton from "@/components/logoutButton/Logout.vue"
export default {
  name: "Navbar",
  components: {
    LogoutButton
  }
};
</script>

<style></style>
