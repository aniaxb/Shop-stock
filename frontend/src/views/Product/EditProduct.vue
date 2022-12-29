<template>
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
        <tr v-for="shoe in products" :key="shoe">
          <td>{{ shoe.id }}</td>
          <td>{{ shoe.brand }}</td>
          <td>{{ shoe.name }}</td>
          <td>{{ shoe.description }}</td>
          <td>{{ shoe.price }}$</td>
          <td>{{ shoe.weight }}kg</td>
          <td>
            <button class="btn btn-sm text-black" @click="edit(shoe.id)">
              Edit
            </button>
            <formComponent
              :product_id="product_id"
              v-if="showForm"
              class="form-popup"
              @close="showForm = false"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import formComponent from "./FormComponent.vue";
export default {
  components: {
    formComponent,
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
    };
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
            this.products = res.data;
            this.products.sort(function (a, b) {
              return -(b.id - a.id || a.name.localeCompare(b.name));
            });
            // console.log(this.products);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.$swal({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
          });
        });
    },
    async edit(id) {
      this.product_id = id;
      this.showForm = true;
      console.log(this.product_id);
    },
  },
  created() {
    // #CCDDE2
    document.body.style.backgroundColor = "#e9f1f7";
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.brands = JSON.parse(localStorage.getItem("brands"));
    // console.log(this.brands);
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
  height: 40%;
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
