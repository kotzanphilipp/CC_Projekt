import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App);
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDvNvMpi3KSha2QEgGsWuCqMqSDruQBfAU",
  },
}).mount('#app')
