<template>
  <div class="">
    <div class="fw-bold fs-3 mb-3">Order Status</div>
    <div class="mb-2">
      <b>ID: </b><span class="mx-2">{{order_id}}</span>
    </div>
    <div>
      <b>Status: </b><span class="mx-2">{{status}}</span>
    </div>

    <form class="col-8 mt-4 mb-5 mx-auto">
      <div class="col-6 mx-auto mb-2">
        <label for="exampleInputEmail" class="col-12 form-label">Status name</label>
        <select v-model="selected" class="form-select col-5">
          <option :value="i" v-for="i in statusList">{{ i.name }}</option>
        </select>
      </div>
    </form>

    <button
        @click="handleSubmit()"
        class="btn btn-sm editFormButton text-light mt-2 mx-2"
    >
      Submit
    </button>

    <button
        @click="$emit('close')"
        class="btn btn-sm editFormButton text-light mt-2 mx-2"
    >
      Close
    </button>
  </div>
</template>

<script>
import {toRaw} from "vue";
import {SweetAlert} from "../../helpers/sweetAlert";
import {Network} from "../../helpers/network";

export default {
  props: ["order_id", "statusList"],
  data() {
    return {
      status: "",
      selected: "",
    };
  },

  methods: {
    async loadOrder() {
      Network.getOrder(localStorage.getItem("token"), this.order_id).then(result => {
        this.status = result.status.name;
      }).catch((err) => {
        console.log("err", err.response.data);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
    },

    async handleSubmit() {
      Network.editOrder(localStorage.getItem("token"),
          this.order_id,
          toRaw(this.selected.name),
          new Date().toLocaleDateString()).then(res => {
        SweetAlert.accepted(this.$swal, "Order has been updated")
        this.$emit('close')
      }).catch((err) => {
        console.log(err.response.data.message);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
    },
  },

  mounted() {
    this.loadOrder();
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
