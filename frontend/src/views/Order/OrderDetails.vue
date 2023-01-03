<template>
  <div class="">
    <div class="fw-bold fs-3">Order Details</div>
    <div>
      <b>UserName:</b>
      <div v-html="userName"></div>
    </div>

    <div>
      <b>Email:</b>
      <div v-html="email"></div>
    </div>

    <div>
      <b>PhoneNumber:</b>
      <div v-html="phoneNumber"></div>
    </div>

    <div>
      <b>Price:</b>
      <div v-html="totalPrice"></div>
    </div>

    <div>
      <b>Status:</b>
      <div v-html="status"></div>
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
        <tr v-for="prod in productQuantities" :key="prod">
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
import axios from "axios";

export default {
  props: ["order_id"],
  data() {
    return {
      date: "",
      userName: "",
      email: "",
      phoneNumber: "",
      totalPrice: "",
      productQuantities: [],
      status: ""
    };
  },
  methods: {
    async loadOrder() {
      axios
          .get(`http://localhost:3000/orders/${this.order_id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.date = res.data.date;
              this.userName = res.data.userName;
              this.email = res.data.email;
              this.phoneNumber = res.data.phoneNumber;
              this.totalPrice = res.data.totalPrice;
              this.productQuantities = res.data.productQuantities;
              this.status = res.data.status.name;
            }
          })
          .catch((err) => {
            console.log("err", err.response.data);
            this.$swal({
              title: "Error",
              text: err.response.data.message,
              icon: "error",
            });
          });
    },
  },
  mounted() {
    this.loadOrder();
  },
};
</script>

<style></style>
