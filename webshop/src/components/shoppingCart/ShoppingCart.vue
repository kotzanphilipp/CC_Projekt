<template>
  <div class="warenkorb">
    <!--Section: Block Content-->
    <section>
      <!--Grid row-->
      <div class="row">
        <!--Grid column-->
        <div class="col-lg-8">
          <!-- Card -->
          <div class="mb-3">
            <div class="pt-4 wish-list">
              <h5 class="mb-4">Warenkorb</h5>
              <div class="row mb-4" v-for="c in cart" v-bind:key="c.id">
                <div class="col-md-5 col-lg-3 col-xl-3">
                  <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                    <img
                      class="card-img-top"
                      :src="c.produktImageURL"
                      alt="Sample"
                      height="240"
                      width="auto"
                    />
                  </div>
                </div>
                <div class="col-md-7 col-lg-9 col-xl-9">
                  <div>
                    <div class="d-flex justify-content-between">
                      <div>
                        <h5>{{ c.produktName }}</h5>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <p class="mb-0">
                        <span
                          ><strong id="summary"
                            >Preis: {{ c.produktPreis }}</strong
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Grid column-->
        <div class="col-lg-4">
          <div class="mb-3">
            <div class="pt-4">
              <h5 class="mb-3">Rechnung</h5>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                >
                  Preis ohne Mehrwertsteuer
                  <span>{{ sum }} Euro</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center px-0"
                >
                  Shipping
                  <span>Gratis</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3"
                >
                  <div>
                    <strong>Preis insgesamt</strong>
                    <strong>
                      <p class="mb-0">(inkl. Mehrwertsteuer von 19%)</p>
                    </strong>
                  </div>
                  <span
                    ><strong>{{ sumWithTax }} Euro</strong></span
                  >
                </li>
              </ul>
              <button type="button" class="btn btn-primary btn-block">
                Jetzt kaufen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";

export default {
  name: "ShoppingCart",
  setup() {
    let cart = reactive([]);
    let sum = ref(0);
    let sumWithTax = ref(0);

    onMounted(() => {
      readLocalStorageCart()
        .then(function() {
          calcCartSum().then(function() {
            console.log("calculating sum...");
            console.log("sum is: " + sum.value);
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    async function readLocalStorageCart() {
      cart.push(...JSON.parse(localStorage["cart"]));
    }

    async function calcCartSum() {
      cart.forEach(function(item) {
        sum.value += parseFloat(item.produktPreis);
      });
      sumWithTax.value = 1.19 * sum.value;
    }

    return {
      cart,
      sum,
      sumWithTax,
    };
  },
};
</script>
