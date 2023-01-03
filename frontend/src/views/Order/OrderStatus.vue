<template>
  <div class="">
    <div class="fw-bold fs-3">Order Status</div>
    <div>
      <b>Status:</b>
      <div v-html="status"></div>
    </div>

    <form class="col-8 mt-2">
      <div class="col-5">
        <label for="exampleInputEmail" class="form-label">Status name</label>
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
import axios from "axios";
import {toRaw} from "vue";

export default {
  props: ["order_id"],
  data() {
    return {
      status: "",
      statusList: [],
      selected: "",
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
              // console.log(this.orders);
            }
          })
          .catch((err) => console.log("err", err.response.data));
    },
    async handleSubmit() {
      await axios
          .put(
              `http://localhost:3000/orders/${this.order_id}`,
              { name: toRaw(this.selected.name) },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
          )
          .then((res) => {
            if (res.status === 200) {
              console.log("Product has been updated");
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err.response.data.message);
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
    this.fetchstatus();
  },
};
</script>

<style></style>
