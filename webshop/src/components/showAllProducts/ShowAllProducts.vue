<template>
  <div>
    <router-link to="/admin" class="deco-none">
      <button class="btn btn-warning btn-all-products">zurück</button>
    </router-link>
    <router-link to="/addProduct" class="deco-none">
      <button class="btn btn-warning btn-all-products">
        Artikel hinzufügen
      </button>
    </router-link>
    <h1>Alle Artikeln anzeigen</h1>
    <div class="container">
      <div class="row">
        <div
          class="col-sm-4"
          v-for="(product, index) in products"
          v-bind:key="product.id"
        >
          <div class="card" style="width: 18rem;">
            <img
              class="card-img-top"
              :src="product.produktImageURL"
              alt="Card image cap"
              height="240"
              width="180"
            />
            <div class="card-body text-center">
              <h5 class="card-title text-center">{{ product.produktName }}</h5>
              <p class="card-text text-center">{{ product.produktPreis }}</p>
              <router-link
                :to="{
                  name: 'EditProduct',
                  params: {
                    id: product.id,
                    name: product.produktName,
                    price: product.produktPreis,
                    description: product.produktBeschreibung,
                    image: product.produktImage,
                  },
                }"
              >
                <a class="btn btn-primary btn-all-products">Bearbeiten</a>
              </router-link>
              <a
                @click="deleteProdukt(product, index)"
                class="btn btn-danger btn-all-products"
                >Löschen</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useSession from "@/service/SessionStore";
import { reactive } from "vue";
import axios from "axios";

export default {
  name: "AddProduct",
  data() {
    const { token } = useSession();
    let products = reactive([]);
    const cloudfunctions_produkts_API_URL =
      "https://europe-west3-webshop-316612.cloudfunctions.net/produkte/";
    const cloudfunctions_imageService_GET_API_URL =
      "https://europe-west3-webshop-316612.cloudfunctions.net/imageService/getURL?product=";
    const cloudfunctions_imageService_DELETE_API_URL =
      "https://europe-west3-webshop-316612.cloudfunctions.net/imageService/delete?product=";
    return {
      token,
      products,
      cloudfunctions_produkts_API_URL,
      cloudfunctions_imageService_GET_API_URL,
      cloudfunctions_imageService_DELETE_API_URL,
    };
  },
  methods: {
    async fetchProducts(products) {
      await axios
        .get(this.cloudfunctions_produkts_API_URL)
        .then(function(response) {
          products.push(...response.data);
          console.log(products);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    async fetchProductsURL(products) {
      products.forEach((product) => {
        axios
          .get(
            this.cloudfunctions_imageService_GET_API_URL + product.produktImage
          )
          .then(function(response) {
            product.produktImageURL = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },

    async deleteProdukt(product, index) {
      console.log("product_ID: " + product.id);
      console.log("token is:", this.token);
      await fetch(this.cloudfunctions_produkts_API_URL + product.id, {
        mode: "cors",
        method: "DELETE",
        headers: { token: this.token },
      })
        .then(function() {
          //deleteProduktImage(product);
          // Delete The Product From the Array
          this.products.splice(index, 1);
          console.log("Product is Deleted Successfully");
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /*async deleteProduktImage(product) {
      axios
        .get(cloudfunctions_imageService_DELETE_API_URL + product.produktImage)
        .then(function() {
          console.log("Product Image is Deleted Successfully");
        })
        .catch(function(error) {
          console.log(error);
        });
    }*/
  },
  beforeMount() {
    this.fetchProducts(this.products);
    this.fetchProductsURL(this.products);
  },
};
</script>

<style>
.btn-all-products {
  margin: 1%;
}
</style>
