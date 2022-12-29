<template>
  <div class="">
    <div class="fw-bold fs-3">Add Product</div>
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
        <div class="col-5">
          <label for="exampleInputEmail" class="form-label"
          >Product img</label
          >
          <input
              type="text"
              class="form-control"
              v-model="Pimg"
              placeholder="https://images.stockx.com/images/Air-Jordan-1"
          />
        </div>

        <div class="col-3">
          <label class="form-label" for="exampleUsername">Product Category</label>

          <select v-model="Pcategory" class="form-select col-5" @click="addCategory">
            <option :value="category" v-for="category in categories">
              {{ category.name }}
            </option>
          </select>
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
import {toRaw} from "vue";

export default {
  data() {
    return {
      Pbrand: "",
      Pname: "",
      Pdescription: "",
      Pprice: "",
      Pweight: "",
      Pimg: "",
      categories: [],
      Pcategory: "",
      selectedCategories: [],
      brands: Object,
    };
  },
  methods: {
    async handleSubmit() {
      await axios
          .post(
              `http://localhost:3000/products`,
              {
                name: this.Pname,
                brand: this.Pbrand,
                img: this.Pimg,
                description: this.Pdescription,
                price: parseFloat(this.Pprice),
                weight: parseFloat(this.Pweight),
                categories: this.selectedCategories
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
          )
          .then((res) => {
            if (res.status === 200) {
              console.log("Product has been added");
              window.location.reload();
            }
          })
          .catch((err) => console.log(err.response.data.message));
    },
    addCategory() {
      if(this.Pcategory !== "") {
        const set = new Set(toRaw(this.selectedCategories));
        set.add(toRaw(this.Pcategory));
        this.selectedCategories = Array.from(toRaw(set))
      }
    },
    fetchCategories() {
      axios
          .get("http://localhost:3000/categories", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.categories = res.data;
            }
          })
          .catch((err) => console.log("err", err.response.data));
    },
  },
  mounted() {
    this.brands = JSON.parse(localStorage.getItem("brands"));
    this.fetchCategories();
  },
};
</script>

<style></style>
