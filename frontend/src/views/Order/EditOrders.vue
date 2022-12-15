<template>
  <div class="" id="divTable">
    <table class="table table-light table-striped mt-5 text-center">
      <thead class="">
        <tr>
          <th>Order id</th>
          <th>Username</th>
          <th>Phone Number</th>
          <th>Status name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order">
          <td>{{ order.id }}</td>
          <td>{{ order.userName }}</td>
          <td>{{ order.phoneNumber }}</td>
          <td>{{ order.status.name }}</td>
          <td>
            <button v-on:click="edit(order.id)" class="btn btn-sm text-black">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="">
      <form class="col-8 mx-auto">
        <div class="row mb-3">
          <div class="col-3">
            <label class="form-label" for="exampleUsername">Status ID</label>
            <input
              type="text"
              class="form-control"
              v-model="Sid"
              placeholder="username"
            />
          </div>
          <div class="col-5">
            <label for="exampleInputEmail" class="form-label"
              >Status name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="Sname"
              placeholder="email"
            />
          </div>
        </div>
        
      </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      Sid: "",
      Sname: "",
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
            // console.log(this.orders);
          }
        })
        .catch((err) => console.log("err", err.response.data));
    },
    edit(id) {
      axios
      .put(`http://localhost:3000/orders/${id}`, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // this.orders = res.data;
            console.log(this.token)
            let newstatus = 2;
            for(const order of orders) {
              if(order.id == id) {
                order.status.id = newstatus;
              }
            }
            console.log("Order has been updated");
          }
        })
        .catch((err) => console.log("err", err.response.data, this.token));
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
