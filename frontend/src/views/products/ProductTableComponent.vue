<template>
  <div class="container">
    <div class="row mx-auto">
      <div class="col mt-3 text-center ">
        <button class="btn" id="addProductButton" @click="addProduct">
          Add new product
        </button>
        <addFormComponent
          v-if="addShowForm"
          class="form-popup-add"
          @close="fetchProducts"
        />
      </div>
    </div>
  </div>
  <div class="" id="divTable">
    <table class="table table-light table-striped mt-4 text-center">
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
            <button class="btn btn-sm edit" @click="edit(shoe.id)">
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
import editForm from "./EditProductForm.vue";
import addForm from "./AddProductForm.vue";
import {Network} from "../../helpers/network";
import {SweetAlert} from "../../helpers/sweetAlert";
export default {
  components: {
    formComponent: editForm,
    addFormComponent: addForm,
  },
  data() {
    return {
      product_id: 0,
      products: [],
      brands: Object,
      showForm: false,
      addShowForm: false,
      tableSize: 6,
      expandBy: 6,
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
      } else {
        this.tableSize += this.expandBy;
      }
    },

    fetchProducts() {
      this.showForm = false;
      this.addShowForm = false;
      Network.getProducts().then(result => {
        this.products = result;
        this.products.sort(function (a, b) {
          return -(b.id - a.id || a.name.localeCompare(b.name));
        });
      }).catch((err) => {
        console.log(err.response.data.message);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
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

.edit {
  background: #48acf0;
  color: #f7f7f7;
}

#addProductButton {
  color: #f7f7f7;
  background: #48acf0;
}

#addProductButton:hover, .edit:hover{
  background: #3294d6;
  color: #f7f7f7;
}

#divTable {
  margin-left: 10%;
  margin-right: 10%;
}

.container  {
  display: flex;
  flex-direction: row;
}

.form-popup-add {
  position: fixed;
  top: 25%;
  right: 37%;
  width: 30%;
  height: 65%;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-left: 1em;
  z-index: 1;
  overflow-y: auto;
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
