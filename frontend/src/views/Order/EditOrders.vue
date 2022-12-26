<template>
  <form class="col-8 mt-2">
    <div class="col-5">
      <label for="exampleInputEmail" class="form-label">Status name</label>
      <select v-model="Sname" class="form-select col-5">
        <option :value="i" v-for="i in statuslist">{{ i.name }}</option>
      </select>
    </div>
  </form>

  <div class="" id="divTable">
    <table class="table table-light table-striped mt-5 text-center">
      <thead class="">
        <tr>
          <th>Order id</th>
          <th>Username</th>
          <th>Phone Number</th>
          <th>Status name</th>
          <th>Total price</th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order">
          <td>{{ order.id }}</td>
          <td>{{ order.userName }}</td>
          <td>{{ order.phoneNumber }}</td>
          <td>{{ order.status.name }}</td>
          <td>{{ order.totalPrice }}$</td>

          <td>
            <button v-on:click="edit(order.id)" class="btn btn-sm text-black">
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
import { toRaw } from "vue";

export default {
  data() {
    return {
      orders: [],
      Sname: "",
      statuslist: [],
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
          if (res.status === 200) {
            this.orders = res.data;
            this.orders.sort(function (a, b) {
              return -(b.id - a.id || a.name.localeCompare(b.name));
            });

            // console.log(this.orders[0].products);
            // console.log(this.orders);
          }
        })
        .catch((err) => console.log("err", err.response.data));
    },
    fetchstatus() {
      axios
        .get("http://localhost:3000/status", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.statuslist = res.data;
            // console.log(this.orders);
          }
        })
        .catch((err) => console.log("err", err.response.data));
    },
    async edit(id) {
      await axios
        .put(
          `http://localhost:3000/orders/${id}`,
          { name: toRaw(this.Sname.name) },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("Order has been updated");
            window.location.reload();
          }
        })
        .catch((err) => console.log("err", err.response.data));
    },
  },
  created() {
    // #CCDDE2
    document.body.style.backgroundColor = "#e9f1f7";
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchorders();
    this.fetchstatus();
  },
};
</script>

<style scoped>
form {
  max-width: 64em;
  margin: auto;
  /* text-align: center; */
}

#divTable {
  margin-left: 10%;
  margin-right: 10%;
}
button {
  background: #48acf0;
}
</style>
