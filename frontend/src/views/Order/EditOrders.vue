<template>

  <div class="col-4">
    <label class="form-label">Select Status: {{ selectedStatus.name }}</label>
    <select class="form-select" v-model="selectedStatus" @click="filterOrder">
      <option :value="stat" v-for="stat in statusList">
        {{ stat.name }}
      </option>
    </select>
  </div>
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
            <button
                v-on:click="orderDetails(order.id)"
                class="btn btn-sm edit text-black"
            >
              Details
            </button>
            <OrderDetails
                :order_id="order_id"
                v-if="orderDetailsForm"
                class="form-popup"
                @close="orderDetailsForm = false"
            />

            <button
              v-on:click="editOrder(order.id)"
              class="btn btn-sm edit text-black mx-2"
            >
              Edit Status
            </button>
            <OrderStatus
                :order_id="order_id"
                v-if="orderStatusForm"
                class="form-popup"
                @close="orderStatusForm = false"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button
        class="mt-2 col-12 btn btn-dark btn-block mx-2"
        v-on:click="expandTable"
      >
        Show more
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrderDetails from "./OrderDetails.vue";
import OrderStatus from "./OrderStatus.vue";

export default {
  components: {
    OrderDetails,
    OrderStatus,
  },
  data() {
    return {
      orders: [],
      tableSize: 3,
      expandBy: 3,
      orderDetailsForm: false,
      orderStatusForm: false,
      order_id: 0,
      selectedStatus: "",
      statusList: [],
    };
  },
  methods: {
    filterOrder() {
      axios
          .get("http://localhost:3000/orders/selectBy/status", {
            params: { status: this.selectedStatus.name },
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
            }
          }).catch((err) => console.log("err", err.response.data));
    },
    expandTable() {
      if (this.orders.length + this.expandBy <= this.tableSize) {
        this.tableSize = this.orders.length;
        // this.showButton = false;
      } else {
        this.tableSize += this.expandBy;
        // this.showButton = true;
      }
    },
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

          }
        })
        .catch((err) => console.log("err", err.response.data));
    },
    fetchstatus() {
      axios
          .get("http://localhost:3000/status", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.statusList = res.data;
            }
          })
          .catch((err) => console.log("err", err.response.data));
    },
    async orderDetails(id) {
      this.order_id = id;
      this.orderDetailsForm = true;
    },
    async editOrder(id) {
      this.order_id = id;
      this.orderStatusForm = true;
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

.form-popup {
  position: fixed;
  top: 25%;
  right: 37%;
  width: 30%;
  height: 60%;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-left: 1em;
  z-index: 1;
  overflow-y: auto;
}

#divTable {
  margin-left: 10%;
  margin-right: 10%;
}
.edit {
  background: #48acf0;
}
</style>
