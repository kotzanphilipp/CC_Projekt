<template>
  <div class="Home">
    <h1>Home</h1>
    <h2>Willkommen {{ templ.r }}</h2>
  </div>
</template>

<script>
import useSession from "@/service/SessionStore";
import { reactive } from "vue";

export default {
  name: "Home",
  setup() {
    const { role } = useSession();

    const templ = reactive({
      r: role.value,
    });
    return { templ };
  },
};
</script>
