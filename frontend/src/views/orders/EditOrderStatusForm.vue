<template>
  <div class="">
    <div class="fw-bold fs-3">Order Status</div>

    <div>
      <b>ID:</b>
      <div v-html="order_id"></div>
    </div>

    <div>
      <b>Status:</b>
      <div v-html="status"></div>
    </div>

    <form class="col-8 mt-2 mx-auto">
      <div class="col-6 mx-auto mb-2">
        <label for="exampleInputEmail" class="col-12 form-label">Status name</label>
        <select v-model="selected" class="form-select col-5">
          <option :value="i" v-for="i in statusList">{{ i.name }}</option>
        </select>
      </div>
    </form>

    <button
        @click="handleSubmit()"
        class="btn btn-sm btn-primary text-light mt-2 mx-2"
    >
      Submit
    </button>

    <button
        @click="$emit('close')"
        class="btn btn-sm btn-primary text-light mt-2 mx-2"
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
        console.log("Order has been updated");
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

<style></style>
