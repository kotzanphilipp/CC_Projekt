<template>
  <div>
    <router-link to="/showAllProducts" class="deco-none">
      <button>zurück</button>
    </router-link>
    <h1>Artikel bearbeiten</h1>
    <form
      id="editProduct-form"
      v-on:submit.prevent="editProduct($route.params.id)"
    >
      <label for="productName">Artikel Name:</label><br />

      <input
        type="text"
        class="inputFields"
        id="productName"
        name="productName"
        v-model="form.productName"
        required
      /><br /><br />
      <label for="productPrice">Artikel Preis:</label><br />

      <input
        type="text"
        class="inputFields"
        id="productPrice"
        name="productPrice"
        v-model="form.productPrice"
        required
      /><br /><br />
      <label for="productDescription">Artikel Beschreibung:</label><br />

      <input
        type="text"
        class="inputFields"
        id="productDescription"
        name="productDescription"
        v-model="form.productDescription"
        required
      /><br /><br />
      <label for="productImage">Artikel Bild hochladen:</label><br />
      <input
        type="file"
        class="inputFields"
        id="productImage"
        name="productImage"
        required
      /><br /><br />
      <input type="submit" value="hinzufügen" />
    </form>
  </div>
</template>
<script>
export default {
  name: "EditProduct",

  data() {
    return {
      form: {
        productName: this.$route.params.name,
        productPrice: this.$route.params.price,
        productDescription: this.$route.params.description,
      },
    };
  },
  methods: {
    async editProduct(ID) {
      //e.preventDefault(); // it prevent from page reload and prevent inputfield removal
      const cloudfunctions_produkts_API_URL =
        "https://europe-west3-webshop-316612.cloudfunctions.net/produkte/";

      //var imageName = document.getElementById("productImage").value;

      await fetch(cloudfunctions_produkts_API_URL + ID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produktName: this.form.productName,
          produktPreis: this.form.productPrice,
          produktBeschreibung: this.form.productDescription,
          produktImage: this.$route.params.image,
        }),
      })
        .then((res) => console.log(res))
        .then(console.log("The Product is Successfully Updated"))
        .catch((error) => console.log("Error", error));
      this.$router.push({ name: "ShowAllProducts" });
    },
  },
  created() {
    console.log("Produkt-ID = " + this.$route.params.id);
  },
};
</script>
