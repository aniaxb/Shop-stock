<template>
  <div><h1 class="text-center mb-5">Shopping Cart</h1></div>
  <div>
    <div
      v-for="cartItem in cartItems"
      :key="cartItem.id"
      class="row mt-2 pt-3 px-0 mx-0"
    >
      <div class="col-2"></div>
      <div class="col-md-3">
        <img
          :src="cartItem.img"
          alt=""
          class="w-100 card-image-top embed-responsive embed-responsive-16by9"
          style="object-fit: cover"
        />
      </div>
      <div class="col-md-3 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
            {{ cartItem.name }}
          </h6>

          <p class="mb-0 font-weight-bold" id="item-price">
            $ {{ cartItem.price }} per unit
          </p>
        </div>
        <p class="mb-0">
          Total:
          <span class="font-weight-bold">
            $ {{ cartItem.price }}
          </span>
        </p>
      </div>
      <div class="col-2 d-flex justify-content-center align-items-center">
        <div class="row col-8">
          <button
            class="col-4 p-1 mx-2 fs-4 fw-bold text-light btn"
            id="addButton"
            @click="addItem(cartItem.id)"
          >
            +
          </button>
          <button
            class="col-4 p-1 btn fs-4 fw-bold text-light"
            id="deleteButton"
            @click="deleteItem(cartItem.id)"
          >
            -
          </button>
        </div>
      </div>
      <div class="col-12 px-0 mx-0"><hr /></div>
    </div>

    <div class="">
      <form class="col-8 mx-auto">
        <div class="row mb-3">
          <div class="col-3">
            <label class="form-label" for="exampleUsername">Username</label>
            <input
              type="text"
              class="form-control"
              v-model="usernameForm"
              placeholder="username"
            />
          </div>
          <div class="col-5">
            <label for="exampleInputEmail" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              v-model="emailForm"
              placeholder="email"
            />
          </div>
        </div>
        <div class="mb-3 col-8">
          <label for="examplePhone" class="form-label">Phone number</label>
          <input
            type="text"
            class="form-control"
            v-model="phoneNumberForm"
            placeholder="123123123"
          />
        </div>
        <button
          type="submit"
          @click.prevent="submitOrder"
          class="btn col-8"
          id="submitButton"
        >
          Send Order
        </button>
      </form>
    </div>

    <div class="total-cost py-5 px-5">
      <h5>Total : ${{ this.totalCost }}</h5>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { toRaw } from "vue";
import {SweetAlert} from "../../helpers/sweetAlert";
import {Network} from "../../helpers/network";

export default {
  data() {
    return {
      cartItems: Object,
      token: null,
      totalCost: 0,
      usernameForm: "",
      emailForm: "",
      phoneNumberForm: "",
      countCarted: 0,
      quantities: {},
    };
  },

  created() {
    document.body.style.backgroundColor = "#e9f1f7";
  },

  methods: {
    submitOrder() {
      let jsonArray = [];
      const set = new Set(toRaw(this.cartItems));
      for (const cartItem of set) {
        const element = {};
        element.productId = cartItem.id;
        element.quantity = this.quantities[cartItem.id];
        jsonArray.push(element);
      }

      Network.addOrder(this.token, this.usernameForm,
          this.phoneNumberForm,
          this.emailForm,
          this.totalCost,
          4,
          jsonArray,
          new Date().toLocaleDateString()).then(result => {
          console.log("Submitted an order");
          SweetAlert.accepted(this.$swal, "Submitted an order!")
      }).catch((err) => {
        console.log("err", err.response.data);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
    },

    addItem(id) {
      let newArr = [];
      let price = 0;
      for (let carted of this.cartItems) {
        if (carted.id === id) {
          newArr.push(carted);
          price = carted.price;
        }
      }
      this.cartItems.push(newArr[0]);
      localStorage.setItem("cartedProducts", JSON.stringify(this.cartItems));
      this.quantities[id] += 1;
      this.totalCost += price;
      console.log("Added this item again");
    },

    deleteItem(id) {
      let price = 0;
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id === id) {
          price = this.cartItems[i].price;
          this.cartItems.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("cartedProducts", JSON.stringify(this.cartItems));
      this.totalCost -= price;
      this.quantities[id] -= 1;
      console.log("Deleted this item");
    },
  },

  mounted() {
    this.token = localStorage.getItem("token");
    let cartedProducts = JSON.parse(localStorage.getItem("cartedProducts"));
    if (cartedProducts) {
      this.cartItems = JSON.parse(localStorage.getItem("cartedProducts"));

      if (this.cartItems[0]) {
        for (let cartItem of this.cartItems) {
          this.totalCost += parseFloat(cartItem.price);
          this.countCarted += 1;
        }
        this.cartItems.forEach((product) => {
          if (product.id in this.quantities) {
            this.quantities[product.id] += 1;
          } else {
            this.quantities[product.id] = 1;
          }
        });
        localStorage.setItem("countCarted", this.countCarted);
      }
    }
  },
};
</script>

<style>
img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  mix-blend-mode: multiply;
}
#submitButton {
  background: #48acf0;
}

#addButton {
  background: #48acf0;
  border: 1px solid #306d96;
}

#deleteButton {
  background: #48acf0;
  border: 1px solid #306d96;
}
</style>
