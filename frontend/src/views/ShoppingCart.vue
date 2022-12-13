<template>
  <div><h1>Shopping Cart</h1></div>
  <div>
    <div v-for="cartItem in cartItems" :key="cartItem.id" class="row mt-2 pt-3">
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
          <!-- <p class="mb-0">Quantity:{{ cartItem.quantity }}</p> -->
        </div>
        <p class="mb-0">
          Total:
          <span class="font-weight-bold">
            $ {{ cartItem.price }}
            <!-- * cartItem.quantity -->
          </span>
        </p>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>

    <div class="total-cost pt-2 text-right">
      <h5>Total : ${{ this.totalCost }}</h5>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      // cartItems: [
      //   {
      //     id: 2,
      //     name: "Yeezy Boost 350 V2 Zebra",
      //     description:
      //       'Debuted in 2017, the adidas Yeezy Boost 350 V2 Zebra is known as one of the most renowned colorways in the Yeezy line. It features a white and black marbled Primeknit upper with a white side-stripe and red "SPLY-350" text. At the base, a cushioned Boost sole provides comfort and support.',
      //     imgUrl:
      //       "https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-Zebra/Images/adidas-Yeezy-Boost-350-V2-Zebra/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1635342807&h=384&q=57",
      //     price: "220.00",
      //     weight: "0.99",
      //     categories: [],
      //   },
      // ],
      cartItems: Object,
      // cartedProducts: [],

      token: null,
      totalCost: 0,
    };
  },

  methods: {
    countTotalCost(cartItem) {
      // totalCost += cartItem.price;
    },
    // listCartItems(cartedProducts) {
    //   // this.cartItems = cartedItems;
    //   this.cartItems = JSON.parse(JSON.stringify(cartedProducts));
    //   // this.cartItems = Array.from(cartedProducts);
    //   console.log(this.cartItems);
    // },
  },

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
      // this.countTotalCost();
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
</style>
