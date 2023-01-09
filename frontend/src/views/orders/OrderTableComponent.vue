<template>
  <div class="col-2" id="selectStatus">
    <label class="form-label fs-5 fw-bolder"
      >Select Status: {{ selectedStatus.name }}</label
    >
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
          <th>Submission date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in getOrders()" :key="order">
          <td>{{ order.id }}</td>
          <td>{{ order.userName }}</td>
          <td>{{ order.phoneNumber }}</td>
          <td>{{ order.status.name }}</td>
          <td>{{ order.totalPrice }}$</td>
          <td>{{ order.placeDate }}</td>
          <td>
            <button
              v-on:click="orderDetails(order.id)"
              class="btn btn-sm"
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
              class="btn btn-sm mx-2"
            >
              Edit Status
            </button>
            <OrderStatus
              :order_id="order_id"
              :statusList="statusList"
              v-if="orderStatusForm"
              class="form-popup-status"
              @close="fetchOrders"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button
        v-if="isButtonVisible"
        class="mt-2 col-12 btn btn-dark btn-block mx-2"
        v-on:click="expandTable"
      >
        Show more
      </button>
    </div>
  </div>
</template>

<script>
import OrderDetails from "./OrderDetailsForm.vue";
import OrderStatus from "./EditOrderStatusForm.vue";
import {Network} from "../../helpers/network";
import {SweetAlert} from "../../helpers/sweetAlert";

export default {
  components: {
    OrderDetails,
    OrderStatus,
  },

  data() {
    return {
      orders: [],
      tableSize: 6,
      expandBy: 6,
      orderDetailsForm: false,
      orderStatusForm: false,
      order_id: 0,
      selectedStatus: "",
      statusList: [],
      isButtonVisible: true,
    };
  },

  methods: {
    getOrders() {
      if (this.tableSize >= this.orders.length) {
        this.isButtonVisible = false;
      } else this.isButtonVisible = true;
      return this.orders.slice(0, this.tableSize);
    },

    filterOrder() {
      Network.getOrderByStatus(localStorage.getItem("token"), this.selectedStatus.name).then(result => {
        this.orders = result;
        this.orders.sort(function (a, b) {
          return -(b.id - a.id || a.name.localeCompare(b.name));
        });
      }).catch((err) => {
        console.log("err", err.response.data);
        SweetAlert.error(this.$swal, err.response.data.message);
      });
    },

    expandTable() {
      if (this.orders.length + this.expandBy <= this.tableSize) {
        this.tableSize = this.orders.length;
      } else {
        this.tableSize += this.expandBy;
      }
    },

    fetchOrders() {
      this.orderDetailsForm = false;
      this.orderStatusForm = false;
      Network.getOrders(localStorage.getItem("token")).then(result => {
        this.orders = result;
        this.orders.sort(function (a, b) {
          return -(b.id - a.id || a.name.localeCompare(b.name));
        });
      }).catch((err) => {
        console.log("err", err.response.data);
        SweetAlert.error(this.$swal, err.response.data.message);
      });
    },

    fetchStatus() {
      Network.getStatus(localStorage.getItem("token")).then(result => {
        this.statusList = result;
      }).catch((err) => {
        console.log("err", err.response.data)
        SweetAlert.error(this.$swal, err.response.data.message);
      });
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
    document.body.style.backgroundColor = "#e9f1f7";
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchOrders();
    this.fetchStatus();
  },
};
</script>

<style scoped>
#selectStatus {
  margin-left: 5em;
  margin-top: 1.5em;
}

form {
  max-width: 64em;
  margin: auto;
}

.btn {
  color: #f7f7f7;
  background: #48acf0;
}

.btn:hover {
  background: #3294d6;
  color: #f7f7f7;
}

.form-popup {
  position: fixed;
  top: 25%;
  right: 37%;
  width: 30%;
  height: 55%;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-left: 1em;
  z-index: 1;
  overflow-y: auto;
}

.form-popup-status {
  position: fixed;
  top: 25%;
  right: 37%;
  width: 30%;
  height: 40%;
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
</style>
