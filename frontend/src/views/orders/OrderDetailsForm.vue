<template>
  <div class="">
    <div class="fw-bold fs-3">Order Details</div>
    <div>
      <b>UserName:</b>
      <div v-html="order.userName"></div>
    </div>

    <div>
      <b>Email:</b>
      <div v-html="order.email"></div>
    </div>

    <div>
      <b>PhoneNumber:</b>
      <div v-html="order.phoneNumber"></div>
    </div>

    <div>
      <b>Price:</b>
      <div v-html="order.totalPrice"></div>
    </div>

    <div>
      <b>Status:</b>
      <div v-html="status.name"></div>
    </div>

    <div class="" id="divTable">
      <table class="table table-light table-striped mt-5 text-center">
        <thead class="">
        <tr>
          <th>Product</th>
          <th>quantity</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="prod in order.productQuantities" :key="prod">
          <td>{{ prod.product.name }}</td>
          <td>{{ prod.quantity }}</td>
          <td>{{ prod.product.price }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <button
        @click="$emit('close')"
        class="btn btn-sm btn-primary text-light mt-2"
    >
      Close
    </button>
  </div>
</template>

<script>
import {Network} from "../../helpers/network";
import {SweetAlert} from "../../helpers/sweetAlert";
import {toRaw} from "vue";

export default {
  props: ["order_id"],
  data() {
    return {
      order: Object,
      status: Object,
    };
  },
  methods: {
    async loadOrder() {
      Network.getOrder(localStorage.getItem("token"), this.order_id).then(result => {
        this.order = toRaw(result);
        this.status = toRaw(this.order.status)
      }).catch((err) => {
        console.log("err", err.response.data);
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
