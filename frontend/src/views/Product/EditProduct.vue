<template>

  <div class="" id="divTable">
    <table class="table table-light table-striped mt-5 text-center">
      <thead class="">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Weight</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shoe in products" :key="shoe">
          <td>{{ shoe.id }}</td>
          <td>{{ shoe.name }}</td>
          <td>{{ shoe.description }}</td>
          <td>{{ shoe.price }}$</td>
          <td>{{ shoe.weight }}kg</td>
          <td>
            <button v-on:click="edit()" class="btn btn-sm text-black">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="">
      <form class="col-8 mx-auto">
        <div class="row mb-3">
          <div class="col-3">
            <label class="form-label" for="exampleUsername">Product brand</label>
            <input
              type="text"
              class="form-control"
              v-model="Pbrand"
              placeholder="Jordan"
            />
          </div>
          <div class="col-5">
            <label for="exampleInputEmail" class="form-label"
              >Product name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="Pname"
              placeholder="Jordan 1 Dark Mocha"
            />
          </div>
          <div class="col-5">
            <label for="exampleInputEmail" class="form-label"
              >Product description</label
            >
            <input
              type="text"
              class="form-control"
              v-model="Pdescription"
              placeholder="Jordan 1 Dark Mocha"
            />
          </div>
        </div>
        
      </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      Pbrand: "",
      Pname: "",
      Pdescription: ""
    };
  },

  methods: {
    fetchproducts() {
      axios
        .get("http://localhost:3000/products", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.products = res.data;
            // console.log(this.products);
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
    this.fetchproducts();
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
}

#divTable {
  margin-left: 10%;
  margin-right: 10%;
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
