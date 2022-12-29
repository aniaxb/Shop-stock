<template>
  <form class="form col-12 ml-auto mr-auto">
    <div class="row">
      <div class="col-4">
        <label for="" class="form-label">Enter product name:</label>
        <div class="input-group">
          <input
            size="70"
            type="text"
            class="form-control"
            placeholder="Jordan"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="query"
          />
          <button
            class="btn"
            @click="filterProduct"
            id="searchButton"
            type="button"
          >
            Search
          </button>
        </div>
      </div>

      <div class="col-4">
        <label class="form-label">Selected Brand: {{ selected }}</label>
        <select class="form-select" v-model="selected" @click="filterProduct">
          <option :value="brand" v-for="brand in brands">
            {{ brand }}
          </option>
        </select>
      </div>

      <div class="col-4">
        <label class="form-label"
          >Selected Category: {{ selectedCategory.name }}</label
        >
        <select
          class="form-select"
          v-model="selectedCategory"
          @click="filterProduct"
        >
          <option :value="category" v-for="category in categories">
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>
  </form>

  <div class="container justify-content-around">
    <div class="row mt-3 products text-center">
      <div v-for="shoe in displayed" :key="shoe" class="col-lg-4">
        <div class="p-2 mt-5 rounded item">
          <div class="fw-semibold fs-5">{{ shoe.name }}</div>
          <div>
            <img :src="shoe.img" class="img-fluid" />
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
import axios from "axios";
import _ from "lodash";
import {toRaw} from "vue";

export default {
  name: "BrowseProducts",

  data() {
    return {
      allProducts: [],
      displayed: [],
      cartedProducts: [],
      query: "",
      shoe: {},
      selected: "None",
      selectedCategory: "None",
      categories: [],
      brands: [],
    };
  },
  created() {
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
        .catch((err) => {
          console.log("err", err.response.data);
          this.$swal({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    fetchCategories() {
      axios
        .get("http://localhost:3000/categories", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.categories = res.data;
          }
        })
        .catch((err) => {
          console.log("err", err.response.data);
          this.$swal({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    fetchBrands() {
      axios
        .get("http://localhost:3000/products", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.shoesData = res.data;
            let arr = [];
            for (let shoe of this.shoesData) {
              arr.push(shoe.brand);
            }
            this.brands = arr.filter(
              (item, index, self) => self.indexOf(item) === index
            );
            localStorage.setItem("brands", JSON.stringify(this.brands));
          }
        })
        .catch((err) => {
          console.log("err", err.response.data);
          this.$swal({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
          });
        });
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
      this.$swal({
        toast: true,
        title: "Good job!",
        text: "Added product to cart!",
        icon: "success",
      });
      // window.location.reload();
    },

    filterProduct() {
      let filterProd = [];
      const filter = {};
      if (this.query) {
        filter.name = this.query;
      }
      if (this.selected !== "None") {
        filter.brand = this.selected;
      }

      filterProd = this.allProducts.filter(function(item) {
        for (const key in filter) {
          if (item[key] === undefined || !item[key].toLocaleLowerCase().includes(filter[key].toLocaleLowerCase()))
            return false;
        }
        return true;
      });

      if (this.selectedCategory !== "None") {
        for (let i = 0; i < filterProd.length; i++) {
          if (!filterProd[i].categories.some(e => e.name === this.selectedCategory.name)) {
            filterProd.splice(i, 1);
          }
        }
      }

      if(filterProd.length === 0) {
        this.$swal({
          title: "Error",
          text: "No product meets the given categories",
          icon: "error",
        });
        this.query = "";
        this.selected = "None";
        this.selectedCategory ="None";
        this.displayed = this.allProducts;
      } else {
        this.displayed = filterProd;
      }
    },
  },
  mounted() {
    // window.location.reload();
    this.token = localStorage.getItem("token");

    this.fetchProducts();
    this.fetchCategories();
    this.fetchBrands();
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

form {
  max-width: 64em;
  margin: auto;
  /* text-align: center; */
}
form label {
  margin-top: 1em;
}

div .item {
  position: relative;
}

#ATCbutton {
  background: #48acf0;
  position: absolute;
  bottom: 6px;
}
#searchButton {
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
  align-items: center;
}

@media (max-width: 1400px) {
  .container .products {
    flex-direction: column;
    align-items: center;
  }
}
</style>
