<template>
  <div class="">
    <form class="mx-3">
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
          <label for="exampleInputEmail" class="form-label"
            >Product price</label
          >
          <input
            type="text"
            class="form-control"
            v-model="Pprice"
            placeholder="100.00"
          />
        </div>
        <div class="col-5">
          <label for="exampleInputEmail" class="form-label"
            >Product weight</label
          >
          <input
            type="text"
            class="form-control"
            v-model="Pweight"
            placeholder="0.7"
          />
        </div>
      </div>
    </form>
    <button
      @click="handleSubmit()"
      class="btn btn-sm btn-primary text-light mx-3 mt-2"
    >
      Submit
    </button>
    <button
      @click="$emit('close')"
      class="btn btn-sm btn-primary text-light mt-2"
    >
      Close
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['product_id'],
  data() {
    return {
      Pbrand: "",
      Pname: "",
      Pdescription: "",
      Pprice: "",
      Pweight: "",
      brands: Object,
    };
  },
  methods: {
    async loadProduct() {
      axios
          .get(`http://localhost:3000/products/${this.product_id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.Pname = res.data.name;
              this.Pdescription = res.data.description;
              this.Pprice = res.data.price;
              this.Pweight = res.data.weight;
              this.Pbrand = res.data.brand;
            }
          })
          .catch((err) => console.log("err", err.response.data));
    },
    async handleSubmit() {
      await axios
          .put(
              `http://localhost:3000/products/${this.product_id}`,
              {
                name: this.Pname,
                brand: this.Pbrand,
                description: this.Pdescription,
                price: parseFloat(this.Pprice),
                weight: parseFloat(this.Pweight),
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
          )
          .then((res) => {
            if (res.status === 200) {
              console.log("Product has been updated");
              window.location.reload();
            }
          })
          .catch((err) => console.log("err", err.response.data));
    },
  },
  mounted() {
    this.brands = JSON.parse(localStorage.getItem("brands"));
    this.loadProduct();
  },
};
</script>

<style></style>
