var cloudfunctions_produkts_URL =
  "https://europe-west3-webshop-316612.cloudfunctions.net/produkte/";

const produktData = {
  produktName: document.getElementById("productName").value,
  produktPreis: document.getElementById("productPrice").value,
  produktBeschreibung: document.getElementById("productDescription").value,
};

function empty_fields() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDescription").value = "";
}
/*
// Get (Fetched Data From any API (Or Rest-Api))
function getAllProducts() {
  fetch(cloudfunctions_produkts_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      show(data);
    })
    .catch((error) => console.log(error));
}
*/
// Post (Fetched Data From any API (Or Rest-Api))
function createProduct() {
  if (produktName !== "" && produktPreis !== "" && produktBeschreibung !== "") {
    fetch(cloudfunctions_produkts_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ produktData }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("Error", error));

    empty_fields();
  } else {
    console.log("Die Eingabefelder sind nicht vollständig ausgefüllt");
  }
}
/*
// Get (Fetched Data From any API by ID (Or Rest-Api))
function getProduct(produkt_ID) {
  fetch(cloudfunctions_produkts_URL + produkt_ID)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      show(data);
    })
    .catch((error) => console.log(error));
}

// DELETE (Fetched Data From any API by ID (Or Rest-Api))
function removeProdukt(produkt_ID) {
  fetch(cloudfunctions_produkts_URL + produkt_ID, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}*/
