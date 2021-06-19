<template>
  <div>
    <router-link to="/admin" class="deco-none">
      <button>zurück</button>
    </router-link>
    <h1>Artikel hinzufügen</h1>
    <form id="addProduct-form" v-on:submit="addProduct">
      <label for="productName">Artikel Name:</label><br />
      <input
        type="text"
        id="productName"
        name="productName"
        v-model="form.productName"
        required
      /><br /><br />
      <label for="productPrice">Artikel Preis:</label><br />
      <input
        type="text"
        id="productPrice"
        name="productPrice"
        v-model="form.productPrice"
        required
      /><br /><br />
      <label for="productDescription">Artikel Beschreibung:</label><br />
      <input
        type="text"
        id="productDescription"
        name="productDescription"
        v-model="form.productDescription"
        required
      /><br /><br />
      <label for="productImage">Artikel Bild hochladen:</label><br />
      <input
        type="file"
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
  name: "AddProduct",
  data() {
    return {
      form: {
        productName: "",
        productPrice: "",
        productDescription: "",
      },
    };
  },
  methods: {
    addProduct(e) {
      e.preventDefault(); // it prevent from page reload and prevent inputfield removal
      const cloudfunctions_produkts_URL =
        "https://europe-west3-webshop-316612.cloudfunctions.net/produkte/";

      var imageName = document.getElementById("productImage").value;

      fetch(cloudfunctions_produkts_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produktName: this.form.productName,
          produktPreis: this.form.productPrice + " $",
          produktBeschreibung: this.form.productDescription,
          produktImage: imageName.split(/(\\|\/)/g).pop(),
        }),
      })
        // .then((data) => console.log(data))
        .catch((error) => console.log("Error", error));

      // Empty The Input Fields after Submit
      document.getElementById("productName").value = "";
      document.getElementById("productPrice").value = "";
      document.getElementById("productDescription").value = "";
      document.getElementById("productImage").value = "";
    },
  },
};
</script>
