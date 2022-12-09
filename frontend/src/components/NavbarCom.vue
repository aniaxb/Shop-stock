<template>
  <nav class="navbar navbar-expand-lg navbar-dark" id="mainNavbar">
    <!-- Navbar content -->
    <!--    Logo-->
    <RouterLink class="navbar-brand" to="/">
      <img src="http://cdn.onlinewebfonts.com/svg/img_473618.png" alt="" />
      ShoeStock
    </RouterLink>

    <!--    Burger Button-->
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
      <RouterLink to="/products" class="px-3 link">Products</RouterLink>
      <RouterLink to="/categories" class="px-3 link">Categories</RouterLink>

      <!--      Search Bar-->
      <form class="form-inline ml-auto mr-auto">
        <div class="input-group">
          <input
            size="70"
            type="text"
            class="form-control"
            placeholder="Search Items"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="search-button-navbar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="25"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </form>
      <!-- dropdown for browse -->
      <!-- dropdown for account -->
      <RouterLink v-if="!token" class="nav-item link mx-3" to="/login"
        >Sign in
      </RouterLink>
      <a class="nav-item link mx-3" v-if="token" @click.prevent="signOut"
        >Sign out
      </a>
      <!-- <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown border rounded mx-3">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarAccount"
            data-toggle="dropdown"
          >
            Account
          </a>

          <div class="dropdown-menu" aria-labelledby="navbarAccount">
          <RouterLink v-if="token" class="dropdown-item" to="/browse"
              >Wishlist
            </RouterLink>
          <RouterLink v-if="!token" class="dropdown-item" to="/login"
              >Sign up
            </RouterLink>
          <RouterLink v-if="!token" class="dropdown-item" to="/login"
              >Sign in
            </RouterLink>
            <a class="dropdown-item" v-if="token" href="#" @click="signout"
              >Sign out
            </a>
          </div>
        </li>
      </ul> -->
      <RouterLink class="text-light px-3 py-2 border rounded" to="/cart"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-cart-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </svg>
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
    };
  },
  methods: {
    signOut() {
      console.log("signed out");
      localStorage.removeItem("token");
      this.token = null;
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
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
