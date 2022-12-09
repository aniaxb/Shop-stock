<template>
  <div class="container justify-content-around">
    <div class="row mt-5 products text-center">
      <div v-for="(shoe, index) in products" :key="index" class="col-lg-4">
        <div class="p-2 mt-5 rounded item">
          <div>{{ shoe.fullname }}</div>
          <div id="picture"></div>
          <div>
            <img :src="shoe.imgUrl" class="img-fluid" />
          </div>
          <div>{{ shoe.description }}</div>
          <div>{{ shoe.price }}$</div>
          <div>
            <button v-on:click="addToCart()" class="btn">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../assets/products.json";
import axios from "axios";

export default {
  name: "BrowseProducts",

  data() {
    return {
      productData: json,
      products: Object,
    };
  },
  created() {
    // #CCDDE2
    document.body.style.backgroundColor = "#e9f1f7";
  },

  methods: {
    fetchProducts() {
      axios
        .get("http://localhost:3000/products", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.products = res.data;
            console.log(this.products);
          }
        })
        .catch((err) => console.log("err", err));
    },
    addToCart() {
      if (!this.token) {
        // user is not logged in
        // show error
        console.log("please login to add item to cart");
        return;
      }
      // add to cart
      axios
        .post(
          "http://localhost:3000/orders",
          {
            userName: "magik",
            phoneNumber: "123123123",
            status: {
              id: 1,
              name: "ACCEPTED",
            },
            products: [
              {
                name: "But5",
                description: "wygodny",
                imgUrl: "http//xd.pl",
                price: 5.5,
                weight: 6.6,
                categories: [
                  {
                    id: 1,
                    name: "skateboardowe",
                  },
                ],
              },
            ],
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            console.log("Product added in cart");
          }
        })
        .catch((err) => console.log("err", err));
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchProducts();
  },
};
</script>

<style scoped>
.item {
  border: 2px solid #48acf0;
}

button {
  background: #48acf0;
}

.link {
  text-decoration: none;
  color: #f5f5f5;
}
.products img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  mix-blend-mode: multiply;
  /* mix-blend-mode: color-burn; */
}

.container .products {
  display: flex;
  flex-direction: row;
}

@media (max-width: 600px) {
  .container .products {
    flex-direction: column;
  }
}
</style>
