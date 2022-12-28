<template>
  <!-- <div class="d-flex justify-content-center"> -->
  <form class="">
    <div class="row mt-2">
      <div class="col-3">
        <label class="form-label" for="exampleUsername">Product brand</label>

        <select v-model="Pbrand" class="form-select col-5">
          <option :value="i" v-for="i in this.brands">
            {{ i }}
          </option>
        </select>
      </div>
      <div class="col-7">
        <label for="exampleInputEmail" class="form-label">Product name</label>
        <input
          type="text"
          class="form-control"
          v-model="Pname"
          placeholder="Jordan 1 Dark Mocha"
        />
      </div>
    </div>

    <div class="col-10">
      <label for="exampleInputEmail" class="form-label"
        >Product description</label
      >
      <input
        type="text"
        class="form-control"
        v-model="Pdescription"
        placeholder="This is a great shoe, released in 2019 ..."
      />
    </div>
    <div class="row">
      <div class="col-5">
        <label for="exampleInputEmail" class="form-label">Product price</label>
        <input
          type="text"
          class="form-control"
          v-model="Pprice"
          placeholder="100.00"
        />
      </div>
      <div class="col-5">
        <label for="exampleInputEmail" class="form-label">Product weight</label>
        <input
          type="text"
          class="form-control"
          v-model="Pweight"
          placeholder="0.7"
        />
      </div>
    </div>
  </form>

  <!-- </div> -->

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
            <button @click="edit(shoe.id)" class="btn btn-sm text-black">
              Edit
            </button>
          </td>
          <td>
            <button class="btn btn-sm text-black" @click="showForm = true">
              Show Form
            </button>
            <formComponent
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
        .catch((err) => console.log("err", err.response.data));
    },
    async edit(id) {
      console.log(
        this.Pbrand,
        this.Pname,
        this.Pdescription,
        this.Pprice,
        this.Pweight
      );
      //przed wyslaniem zczytac to co wyzek ^ i jak jest rozne od "" dodac do jakies mapy
      //i pozniej w put wyciagnac wszystkie wartosci z tej mapy ktore wlozylismy bo
      //mamy pewnosc ze nie sa ""

      await axios
        .put(
          `http://localhost:3000/products/${id}`,
          {
            name: this.Pname,
            brand: this.Pbrand,
            description: this.Pdescription,
            price: parseFloat(this.Pprice),
            weight: parseFloat(this.Pweight),
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("Product has been updated");
          }
        })
        .catch((err) => console.log("err", err.response.data));
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
  top: 0;
  right: 0;
  width: 30%;
  height: 35%;
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
