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
      <div v-for="shoe in getShoes()" :key="shoe" class="col-lg-4">
        <div class="p-2 mt-5 rounded item">
          <div class="fw-semibold fs-5">{{ shoe.name }}</div>
          <div>
            <img :src="shoe.img" class="img-fluid" />
          </div>
          <div>{{ shoe.description }}</div>
          <div class="my-2 fw-bold">{{ shoe.price }}$</div>
          <div class="categories row col-11 mx-auto">
            <span class="col-5 justify-content-around mx-auto border border-dark rounded-circle p-2 mx-2 mb-2 text-light" v-for="category in shoe.categories">
            {{ category.name }} 
            </span>
          </div>
          
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
    <div>
      <button
        v-if="isButtonVisible"
        class="my-2 col-12 btn btn-dark btn-block"
        v-on:click="expandTable"
      >
        Show more
      </button>
    </div>
  </div>
</template>

<script>
import {Network} from "../../helpers/network";
import {SweetAlert} from "../../helpers/sweetAlert";

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
      tableSize: 3,
      expandBy: 3,
      isButtonVisible: true,
    };
  },

  created() {
    document.body.style.backgroundColor = "#e9f1f7";
  },

  methods: {
    getShoes() {
      if (this.tableSize >= this.displayed.length) {
        this.isButtonVisible = false;
      } else this.isButtonVisible = true;
      return this.displayed.slice(0, this.tableSize);
    },

    expandTable() {
      if (this.displayed.length + this.expandBy <= this.tableSize) {
        this.tableSize = this.displayed.length;
      } else {
        this.tableSize += this.expandBy;
      }
    },

    fetchProducts() {
      Network.getProducts().then(result => {
        this.allProducts = result;
        this.allProducts.sort(function (a, b) {
          return -(b.id - a.id || a.name.localeCompare(b.name));
        });
        this.displayed = this.allProducts;
      }).catch((err) => {
        console.log("err", err.response.data);
        SweetAlert.error(this.$swal, err.response.data.message);
      });
    },

    fetchCategories() {
      Network.getCategories().then(result => {
        this.categories = result;
      }).catch((err) => {
        console.log("err", err.response.data);
        SweetAlert.error(this.$swal, err.response.data.message);
      });
    },

    fetchBrands() {
      Network.getProducts().then(result => {
        this.shoesData = result;
        let arr = [];
        for (let shoe of this.shoesData) {
          arr.push(shoe.brand);
        }
        this.brands = arr.filter(
            (item, index, self) => self.indexOf(item) === index
        );
        localStorage.setItem("brands", JSON.stringify(this.brands));
      }).catch((err) => {
        console.log("err", err.response.data);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
    },

    addToCart(index) {
      if (!this.token) {
        SweetAlert.error(this.$swal, "please login to add item to cart")
        return;
      }

      let cartedTest;
      let productIndex = index - 1;
      this.cartedProducts.push(this.allProducts[productIndex]);
      cartedTest = JSON.parse(JSON.stringify(this.cartedProducts));
      localStorage.setItem("cartedProducts", JSON.stringify(cartedTest));
      SweetAlert.accepted(this.$swal, "Added product to cart!")
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

      filterProd = this.allProducts.filter(function (item) {
        for (const key in filter) {
          if (
            item[key] === undefined ||
            !item[key]
              .toLocaleLowerCase()
              .includes(filter[key].toLocaleLowerCase())
          )
            return false;
        }
        return true;
      });

      if (this.selectedCategory !== "None") {
        for (let i = 0; i < filterProd.length; i++) {
          if (
            !filterProd[i].categories.some(
              (e) => e.name === this.selectedCategory.name
            )
          ) {
            filterProd.splice(i, 1);
          }
        }
      }

      if (filterProd.length === 0) {
        SweetAlert.error(this.$swal, "No product meets the given categories")
        this.query = "";
        this.selected = "None";
        this.selectedCategory = "None";
        this.displayed = this.allProducts;
      } else {
        this.displayed = filterProd;
      }
    },
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchProducts();
    this.fetchCategories();
    this.fetchBrands();
  },
};
</script>

<style scoped>
.item {
  border: 2px solid #48acf0;
  width: 416px;
  height: 658px;
  /* width: 100%;
  height: 100%; */
}

form {
  max-width: 64em;
  margin: auto;
}
form label {
  margin-top: 1em;
}

div .item {
  position: relative;
}

.border {
  /* border: 1px solid #48acf0 !important; */
  background-color: #292b2c;
}

#ATCbutton {
  background: #48acf0;
  color: #f7f7f7;
  position: absolute;
  bottom: 1%;
}

#searchButton:hover, #ATCbutton:hover {
  background: #3294d6;
  color: #f7f7f7;
}

#searchButton {
  background: #48acf0;
  color: #f7f7f7;
}

.products img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  mix-blend-mode: multiply;
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
