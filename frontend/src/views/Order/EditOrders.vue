<template>
  <div class="" id="divTable">
    <table class="table table-light table-striped mt-5 text-center">
      <thead class="">
        <tr>
          <th>#</th>
          <th>Status name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order">
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>
            <button v-on:click="edit()" class="btn btn-sm text-black">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
    };
  },

  methods: {
    fetchorders() {
      axios
        .get("http://localhost:3000/orders", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.orders = res.data;
            // console.log(this.orders);
          }
        })
        .catch((err) => console.log("err", err));
    },
  },
  created() {
    // #CCDDE2
    document.body.style.backgroundColor = "#e9f1f7";
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchorders();
  },
};
</script>

<style scoped>
#divTable {
  margin-left: 10%;
  margin-right: 10%;
}
button {
  background: #48acf0;
}
</style>
