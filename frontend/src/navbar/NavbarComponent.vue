<template>
  <nav class="navbar navbar-expand-lg navbar-dark" id="mainNavbar">
    <RouterLink class="navbar-brand" to="/">
      <img src="http://cdn.onlinewebfonts.com/svg/img_473618.png" alt="" />
      ShoeStock
    </RouterLink>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <RouterLink to="/browse" class="px-3 link">Browse</RouterLink>
      <RouterLink to="/products" v-if="token" class="px-3 link"
        >Products</RouterLink
      >
      <RouterLink to="/orders" v-if="token" class="px-3 link"
        >Orders</RouterLink
      >
      <div class="mx-auto order-0"></div>

      <RouterLink v-if="!token" class="nav-item link mx-3" to="/login"
        >Sign in
      </RouterLink>
      <a class="nav-item link mx-3" v-if="token" @click.prevent="signOut"
        >Sign out
      </a>

      <RouterLink class="text-light px-3 py-2 border rounded" to="/cart" v-if="token">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-cart-fill mx-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </svg>
        <span class="px-2 border border-danger bg-danger rounded-circle">
          {{ this.countCarted }}</span
        >
      </RouterLink>
    </div>
  </nav>
</template>

<script>

export default {
  name: "NavbarCom",
  data() {
    return {
      token: null,
      countCarted: 0,
    };
  },

  methods: {
    signOut() {
      localStorage.removeItem("token");
      this.token = null;
      this.$router.push(this.$route.query.redirect || '/')
    },
    interval() {
      setInterval(function() {
        let cartedProducts = JSON.parse(localStorage.getItem("cartedProducts"));
        if(cartedProducts == null) {
          this.countCarted = 0;
        }
        else 
        this.countCarted = cartedProducts.length;
      }.bind(this), 500);
    }
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.countCarted = localStorage.getItem("countCarted");
    this.interval();
  },
};
</script>

<style>
#mainNavbar {
  background-color: #594236;
  margin-top: 0;
  margin-left: 0;
  padding-left: 1em;
}

#mainNavbar img {
  max-width: 50px;
  max-height: 50px;
}

.link {
  text-decoration: none;
  color: white;
}
</style>
