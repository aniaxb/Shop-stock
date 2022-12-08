<template>
  <div class="container justify-content-around">
    <div class="row mt-5 products text-center">
      <div v-for="(shoe, index) in productData" :key="index" class="col-lg-4">
        <div class="p-2 mt-5 rounded item">
          <div>{{ shoe.fullname }}</div>
          <div id="picture"></div>
          <div><img :src="shoe.imgurl" class="img-fluid" /></div>
          <div>{{ shoe.brand }}</div>
          <div>{{ shoe.price }}$</div>
          <div>
            <button v-on:click="addToCart()" class="btn">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="" id="divTable">
    <table class="table table-light table-striped mt-5 text-center">
      <thead class="">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Year</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shoe in productData" :key="shoe">
          <td>{{ shoe.id }}</td>
          <td>{{ shoe.fullname }}</td>
          <td>{{ shoe.brand }}</td>
          <td>{{ shoe.price }}$</td>
          <td>{{ shoe.year }}</td>
          <td>
            <button v-on:click="addToCart()" class="btn btn-sm text-black">
              Add to cart
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <div>
    <i class="fa-solid fa-cart-shopping"></i>
  </div> -->
</template>

<script>
import json from "../assets/products.json";
import axios from "axios";

export default {
  name: "BrowseProducts",

  data() {
    return {
      productData: json,
    };
  },
  created() {
    // #CCDDE2
    document.body.style.backgroundColor = "#e9f1f7";
  },

  methods: {
    addToCart() {
      if (!this.token) {
        // user is not logged in
        // show some error
        console.log("please login to add item to cart");
        return;
      }
      // add to cart
      axios
        // .post(`${this.baseURL}/cart/add?token=${this.token}`, {
        .post(
          "http://localhost:3000/orders",
          {
            userName: "magik",
            phoneNumber: "123123123",
            status: {
              id: 1,
              name: "ACCEPTED",
            },
            products: [
              {
                name: "But5",
                description: "wygodny",
                imgUrl: "http//xd.pl",
                price: 5.5,
                weight: 6.6,
                categories: [
                  {
                    id: 1,
                    name: "skateboardowe",
                  },
                ],
              },
            ],
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            console.log("Product added in cart");
          }
        })
        .catch((err) => console.log("err", err));
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
};
</script>

<style scoped>
.item {
  border: 2px solid #48acf0;
}

button {
  background: #48acf0;
}

#mainNavbar {
  background-color: #594236;
}

.link {
  text-decoration: none;
  color: #f5f5f5;
}
.products img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  mix-blend-mode: multiply;
  /* mix-blend-mode: color-burn; */
}

#divTable {
  margin-left: 10%;
  margin-right: 10%;
}

#mainNavbar img {
  max-width: 50px;
  max-height: 50px;
}

/* table {
  display: inline-block;
} */
.container .products {
  display: flex;
  flex-direction: row;
}

@media (max-width: 600px) {
  .container .products {
    flex-direction: column;
  }
}
</style>
