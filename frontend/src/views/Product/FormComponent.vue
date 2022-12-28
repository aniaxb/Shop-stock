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
      @click="$emit('submit')"
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
export default {
  data() {
    return {
      products: [],
      Pbrand: "",
      Pname: "",
      Pdescription: "",
      Pprice: "",
      Pweight: "",
      brands: Object,
    };
  },
  methods: {
    handleSubmit() {
      // form submission logic goes here
      this.$emit("close");
    },
  },
};
</script>

<style></style>
