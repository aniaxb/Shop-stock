<template>
  <div>Enter name:</div>
  <form class="form-inline ml-auto mr-auto">
    <div class="input-group">
      <input
          size="70"
          type="text"
          class="form-control"
          placeholder="Search Items"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="query"
          v-on:keyup.enter="filterProduct"
      />
<!--      <div class="input-group-prepend">-->
<!--            <span class="input-group-text" id="search-button-navbar">-->
<!--              <svg-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                  width="18"-->
<!--                  height="25"-->
<!--                  fill="currentColor"-->
<!--                  class="bi bi-search"-->
<!--                  viewBox="0 0 16 16"-->
<!--              >-->
<!--                <path-->
<!--                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"-->
<!--                />-->
<!--              </svg>-->
<!--            </span>-->
<!--      </div>-->
    </div>
  </form>

  <div>Selected Brand: {{ selected }}</div>
  <select v-model="selected" @click="filterProduct">
    <option disabled value="">Select brand</option>
    <option>None</option>
    <option>Nike</option>
    <option>Jordan</option>
    <option>Adidas</option>
  </select>

  <div>Selected Category: {{ selectedCategory }}</div>
  <select v-model="selectedCategory" @click="filterProduct">
    <option disabled value="">Select category</option>
    <option>xd</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>
  <div class="container justify-content-around">
    <div class="row mt-5 products text-center">
      <div v-for="shoe in displayed" :key="shoe" class="col-lg-4">
        <div class="p-2 mt-5 rounded item">
          <div class="fw-semibold fs-5">{{ shoe.name }}</div>
          <div>
            <img :src="shoe.imgUrl" class="img-fluid" />
          </div>
          <div>{{ shoe.description }}</div>
          <div class="my-2 fw-bold">{{ shoe.price }}$</div>
          <div>
            <button
              v-on:click="addToCart(shoe.id)"
              id="ATCbutton"
              class="btn translate-middle"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import json from "../assets/products.json";
import axios from "axios";
import _ from "lodash";

export default {
  name: "BrowseProducts",

  data() {
    return {
      // productData: json,
      allProducts: [],
      displayed: [],
      cartedProducts: [],
      query: "",
      shoe: {},
      selected: "None",
      selectedCategory: "None"
      // button,
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
              if (res.status === 200) {
                this.allProducts = res.data;
                this.allProducts.sort(function (a, b) {
                  return -(b.id - a.id || a.name.localeCompare(b.name));
                });
                this.displayed = this.allProducts;
              }
            })
            .catch((err) => console.log("err", err.response.data));
    },

    addToCart(index) {
      if (!this.token) {
        // user is not logged in
        // show error
        console.log("please login to add item to cart");
        return;
      }
      // add to cart
      let cartedTest;
      let productIndex = index - 1;
      this.cartedProducts.push(this.allProducts[productIndex]);
      cartedTest = JSON.parse(JSON.stringify(this.cartedProducts));
      localStorage.setItem("cartedProducts", JSON.stringify(cartedTest));
      console.log("Added to cart", cartedTest);
    },


    filterProduct() {
      let filter = [];

      for (const product of this.allProducts) {
        if (product.name.toLowerCase().includes(this.query) && this.selected.match("None")) {
          filter.push(product);
        } else if(product.brand === this.selected && !this.query) {
          filter.push(product);
        } else if (product.brand === this.selected && product.name.toLowerCase().includes(this.query)) {
          filter.push(product);
        }
      }
      this.displayed = filter;
    }

    // axios
    //   .post(
    //     "http://localhost:3000/orders",
    //     {
    //       userName: "magik",
    //       phoneNumber: "123123123",
    //       status: {
    //         id: 1,
    //         name: "ACCEPTED",
    //       },
    //       products: [
    //         {
    //           name: "But5",
    //           description: "wygodny",
    //           imgUrl: "http//xd.pl",
    //           price: 5.5,
    //           weight: 6.6,
    //           categories: [
    //             {
    //               id: 1,
    //               name: "skateboardowe",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + this.token,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.status == 200) {
    //       console.log("Product added in cart");
    //     }
    //   })
    //   .catch((err) => console.log("err", err));
    // },

    // filterTable(query) {
    //   this.products = this.productsTable;
    //   console.log("pierwszy");
    //   let includedTitle = function () {
    //     return true;
    //   };

    //   if (query === "") {
    //     console.log("drugi");
    //     return;
    //   }

    //   if (query !== "") {
    //     includedTitle = function (filter, movie) {
    //       console.log("trzeci");
    //       return movie.name.toLowerCase().includes(filter.toLowerCase());
    //     };
    //   } else return;

    //   this.products = _.filter(this.productsTable, (movie) => {
    //     console.log("czwarty");
    //     return includedTitle(query, movie);
    //   });
    // },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchProducts();
    // this.products = this.productsTable;
  },
};
</script>

<style scoped>
.item {
  border: 2px solid #48acf0;
  width: 416px;
  height: 618px;
}

div .item {
  position: relative;
}

#ATCbutton {
  background: #48acf0;
  position: absolute;
  bottom: 6px;
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
