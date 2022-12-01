<template>
  <nav id="mainNavbar" class="navbar navbar-dark navbar-expand-lg px-2" >
  <a class="navbar-brand" href="#">
    <img src="http://cdn.onlinewebfonts.com/svg/img_473618.png" alt="">
    ShoeStock</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
        <a class="nav-link active d-flex align-items-center" aria-current="page" href="#">
            <RouterLink to="/" class="link">Home</RouterLink></a>
      </li>
      <li class="nav-item">
        <a class="nav-link active d-flex align-items-center" aria-current="page" href="#">
            <RouterLink to="/browse" class="link">Browse</RouterLink></a>
      </li>
      <li class="nav-item">
        <a class="nav-link active d-flex align-items-center" aria-current="page" href="#">
            <RouterLink to="/login" class="link">Login</RouterLink></a>
      </li>
      <li class="nav-item">
        <a class="nav-link active d-flex align-items-center"><i class="bi bi-cart-fill" href="#"></i></a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
    <!-- <h1>Hello BrowsePage</h1> -->

    <div class="container justify-content-around mt-5 products text-center">
      <div v-for="(shoe, index) in productData" :key="index" class="col-lg-3 ">
        <div class="p-2 rounded item">
          <div>{{shoe.fullname}}</div>
          <div id="picture"></div>
          <div><img :src="shoe.imgurl" class="img-fluid"></div>
          <div>{{shoe.brand}}</div>
          <div>{{shoe.price}}$</div>
          <div><button v-on:click="addToCart()" class="btn">Add to cart</button></div>
        </div>
      </div>
    </div>

    <div id="divTable">
      <table class="table table-light table-striped mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="shoe in productData" :key="shoe" >
            <td>{{shoe.id}}</td>
            <td>{{shoe.fullname}}</td>
            <td>{{shoe.brand}}</td>
            <td>{{shoe.price}}$</td>
            <td>{{shoe.year}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import json from '../assets/products.json'

export default {
name: 'BrowseProducts',

data() {
  return {
    productData: json
  }
},
created() {
  // #CCDDE2
    document.body.style.backgroundColor = "#e9f1f7";
  },
}
</script>

<style scoped>

.item {
  border: 2px solid #48ACF0;
}
button {
  background: #48ACF0;
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

#mainNavbar img {
  max-width: 50px;
  max-height: 50px;
}

table {
  display: inline-block;
}
.container {
  display: flex;
  flex-direction: row;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}




</style>
