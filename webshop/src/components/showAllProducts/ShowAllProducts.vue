<template>
  <div>
    <router-link to="/admin" class="deco-none">
      <button>zurück</button>
    </router-link>
    <h1>Alle Artikeln anzeigen</h1>
    <div class="container">
      <div class="row">
        <div
          class="col-sm-4"
          v-for="product in products"
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
                <a class="btn btn-primary">Bearbeiten</a>
              </router-link>
              <a @click="deleteProdukt(product.id)" class="btn btn-danger"
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
import axios from "axios";
import { onBeforeMount, reactive } from "vue";

export default {
  name: "ShowAllProducts",

  setup() {
    let products = reactive([]);

    const cloudfunctions_produkts_API_URL =
      "https://europe-west3-webshop-316612.cloudfunctions.net/produkte/";
    const cloudfunctions_imageService_API_URL =
      "https://europe-west3-webshop-316612.cloudfunctions.net/imageService/getURL?product=";

    onBeforeMount(() => {
      fetchProducts().then(function() {
        fetchProductsURL();
      });
    });

    async function fetchProducts() {
      await axios
        .get(cloudfunctions_produkts_API_URL)
        .then(function(response) {
          products.push(...response.data);
          console.log(products);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    async function fetchProductsURL() {
      products.forEach((product) => {
        axios
          .get(cloudfunctions_imageService_API_URL + product.produktImage)
          .then(function(response) {
            product.produktImageURL = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }

    async function deleteProdukt(ID) {
      console.log("product: " + ID);
      axios
        .delete(cloudfunctions_produkts_API_URL + ID)
        .then(function() {
          // this.$forceUpdate(); //doesn't work
          console.log("Product is Deleted Successfully");
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    return {
      products,
      deleteProdukt,
    };
  },
};
</script>
