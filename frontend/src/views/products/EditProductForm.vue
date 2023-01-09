<template>
  <div class="">
    <div class="fw-bold fs-3">Edit Product</div>
    <form class="mx-3">
      <div class="row mt-2">
        <div class="col-4">
          <label class="form-label" for="exampleUsername">Product brand</label>

          <select v-model="product.brand" class="form-select col-5">
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
            v-model="product.name"
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
          v-model="product.description"
          maxlength="320"
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
            v-model="product.price"
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
            v-model="product.weight"
            placeholder="0.7"
          />
        </div>
      </div>
    </form>
    <button
      @click="handleSubmit()"
      class="btn btn-sm editFormButton text-light mx-3 mt-2"
    >
      Submit
    </button>
    <button
      @click="$emit('close')"
      class="btn btn-sm editFormButton text-light mt-2"
    >
      Close
    </button>
  </div>
</template>

<script>
import {Network} from "../../helpers/network";
import {SweetAlert} from "../../helpers/sweetAlert";

export default {
  props: ["product_id"],
  data() {
    return {
      product: Object,
      brands: Object,
    };
  },
  methods: {
    async loadProduct() {
      Network.getProduct(localStorage.getItem("token"), this.product_id).then(result => {
        this.product = result;
      }).catch((err) => {
        console.log("err", err.response.data);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
    },

    async handleSubmit() {
      Network.editProduct(localStorage.getItem("token"), this.product_id, this.product).then(result => {
        SweetAlert.accepted(this.$swal, "products has been updated!")
        this.$emit('close')
      }).catch((err) => {
        console.log(err.response.data.message);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
    },
  },

  mounted() {
    this.brands = JSON.parse(localStorage.getItem("brands"));
    this.loadProduct();
  },
};
</script>

<style>
.editFormButton {
  background: #48acf0;
  color: #f7f7f7;
}
.editFormButton:hover {
  background: #3294d6;
  color: #f7f7f7;
}
</style>
