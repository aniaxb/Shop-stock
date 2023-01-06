<template>
  <div class="">
    <div class="fw-bold fs-3 mt-2">Add Product</div>
    <form class="mx-3">
      <div class="row mt-2">
        <div class="col-4">
          <label class="form-label" for="exampleUsername">Product brand</label>

          <select v-model="brand" class="form-select col-5">
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
            v-model="name"
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
          v-model="description"
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
            v-model="price"
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
            v-model="weight"
            placeholder="0.7"
          />
        </div>
        <div class="col-5">
          <label for="exampleInputEmail" class="form-label">Product img</label>
          <input
            type="text"
            class="form-control"
            v-model="img"
            placeholder="https://images.stockx.com/images/Air-Jordan-1"
          />
        </div>

        <div class="col-5">
          <label class="form-label" for="exampleUsername"
            >Product Category</label
          >

          <select
            v-model="productCategory"
            class="form-select col-5"
            @click="addCategory"
          >
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
import { toRaw } from "vue";
import {Network} from "../../helpers/network";
import {SweetAlert} from "../../helpers/sweetAlert";

export default {
  data() {
    return {
      brand: "",
      name: "",
      description: "",
      price: "",
      weight: "",
      img: "",
      categories: [],
      productCategory: "",
      selectedCategories: [],
      brands: Object,
    };
  },
  methods: {
    async handleSubmit() {
      Network.addProduct(localStorage.getItem("token"),
          this.brand,
          this.name,
          this.description,
          this.price,
          this.weight,
          this.img,
          this.selectedCategories).then(result => {
        console.log("products has been added");
        SweetAlert.accepted(this.$swal, "Products has been added")
        this.$emit('close')
      }).catch((err) => {
        SweetAlert.error(this.$swal, err.response.data.message)
        console.log(err.response.data.message);
      });
    },

    addCategory() {
      if (this.productCategory !== "") {
        const set = new Set(toRaw(this.selectedCategories));
        set.add(toRaw(this.productCategory));
        this.selectedCategories = Array.from(toRaw(set));
      }
    },

    fetchCategories() {
      Network.getCategories().then(result => {
        this.categories = result;
      }).catch((err) => console.log("err", err.response.data));
    },
  },

  mounted() {
    this.brands = JSON.parse(localStorage.getItem("brands"));
    this.fetchCategories();
  },
};
</script>

<style></style>
