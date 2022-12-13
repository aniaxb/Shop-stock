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
          :src="cartItem.imgUrl"
          alt=""
          class="w-100 card-image-top embed-responsive embed-responsive-16by9"
          style="object-fit: cover"
        />
      </div>
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
            {{ cartItem.name }}
          </h6>

          <p class="mb-0 font-weight-bold" id="item-price">
            $ {{ cartItem.price }} per unit
          </p>
          <!-- <p class="mb-0">Weight:{{ cartItem.weight }}</p> -->
        </div>
        <p class="mb-0">
          Total:
          <span class="font-weight-bold">
            $ {{ cartItem.price }}
            <!-- * cartItem.weight -->
          </span>
        </p>
      </div>
      <div class="col-12 px-0 mx-0"><hr /></div>
    </div>

    <div class="">
      <form class="col-8 mx-auto">
        <div class="row mb-3">
          <div class="col-3">
            <label class="form-label" for="exampleUsername">Username</label>
            <input type="text" class="form-control" placeholder="username" />
          </div>
          <div class="col-5">
            <label for="exampleInputEmail" class="form-label"
              >Email address</label
            >
            <input type="email" class="form-control" placeholder="email" />
          </div>
        </div>
        <div class="mb-3 col-8">
          <label for="examplePhone" class="form-label">Phone number</label>
          <input type="number" class="form-control" placeholder="123123123" />
        </div>
        <button type="submit" class="btn col-8" id="submitButton">
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
// import axios from "axios";

export default {
  data() {
    return {
      cartItems: Object,
      token: null,
      totalCost: 0,
    };
  },

  methods: {},

  mounted() {
    this.token = localStorage.getItem("token");

    let cartedProducts = JSON.parse(localStorage.getItem("cartedProducts"));
    if (cartedProducts) {
      // console.log(cartedProducts);
      this.cartItems = JSON.parse(localStorage.getItem("cartedProducts"));
      // let totalCost = 0;
      if (this.cartItems[0]) {
        for (let cartItem of this.cartItems) {
          this.totalCost += parseFloat(cartItem.price);
          // console.log(cartItem.price);
        }
        // console.log(this.totalCost);
      }
    }
    // console.log(this.cartItems[0][0]);
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
</style>
