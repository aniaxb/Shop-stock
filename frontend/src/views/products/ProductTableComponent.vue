<template>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        <button class="btn btn-sm text-black" @click="addProduct()">
          Add Product
        </button>
        <addFormComponent
          v-if="addShowForm"
          class="form-popup"
          @close="addShowForm = false"
        />
      </div>
    </div>
  </div>
  <div class="" id="divTable">
    <table class="table table-light table-striped mt-5 text-center">
      <thead class="">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Description</th>
          <th>Price</th>
          <th>Weight</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shoe in getShoes()" :key="shoe">
          <td>{{ shoe.id }}</td>
          <td>{{ shoe.brand }}</td>
          <td>{{ shoe.name }}</td>
          <td>{{ shoe.description }}</td>
          <td>{{ shoe.price }}$</td>
          <td>{{ shoe.weight }}kg</td>
          <td>
            <button class="btn btn-sm text-black edit" @click="edit(shoe.id)">
              Edit
            </button>
            <formComponent
              :product_id="product_id"
              v-if="showForm"
              class="form-popup"
              @close="fetchProducts"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button
        v-if="isButtonVisible"
        class="mt-2 col-12 btn btn-dark btn-block"
        v-on:click="expandTable"
      >
        Show more
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import editForm from "./EditProductForm.vue";
import addForm from "./AddProductForm.vue";
export default {
  components: {
    formComponent: editForm,
    addFormComponent: addForm,
  },
  data() {
    return {
      product_id: 0,
      products: [],
      Pbrand: "",
      Pname: "",
      Pdescription: "",
      Pprice: "",
      Pweight: "",
      brands: Object,
      showForm: false,
      addShowForm: false,
      tableSize: 3,
      expandBy: 3,
      isButtonVisible: true,
    };
  },

  methods: {
    getShoes() {
      if (this.tableSize >= this.products.length) {
        this.isButtonVisible = false;
      } else this.isButtonVisible = true;
      return this.products.slice(0, this.tableSize);
    },

    expandTable() {
      if (this.products.length + this.expandBy <= this.tableSize) {
        this.tableSize = this.products.length;
        // this.showButton = false;
      } else {
        this.tableSize += this.expandBy;
        // this.showButton = true;
      }
    },
    fetchProducts() {
      this.showForm = false;
      this.addShowForm = false;
      axios
        .get("http://localhost:3000/products", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.products = res.data;
            this.products.sort(function (a, b) {
              return -(b.id - a.id || a.name.localeCompare(b.name));
            });
          }
        })
        .catch((err) => console.log(err.response.data.message));
    },
    async edit(id) {
      this.product_id = id;
      this.showForm = true;
    },
    addProduct() {
      this.addShowForm = true;
    },
  },
  created() {
    // #CCDDE2
    document.body.style.backgroundColor = "#e9f1f7";
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.brands = JSON.parse(localStorage.getItem("brands"));
    this.fetchProducts();
  },
};
</script>

<style scoped>
form {
  max-width: 64em;
  margin: auto;
  /* text-align: center; */
}
form label {
  margin-top: 1em;
}
.item {
  border: 2px solid #48acf0;
}

.edit {
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
}

#divTable {
  margin-left: 10%;
  margin-right: 10%;
}

.container .products {
  display: flex;
  flex-direction: row;
}

.form-popup {
  position: fixed;
  top: 25%;
  right: 37%;
  width: 30%;
  height: 42%;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-left: 1em;
  z-index: 1;
  overflow-y: auto;
}

@media (max-width: 600px) {
  .container .products {
    flex-direction: column;
  }
}
</style>
