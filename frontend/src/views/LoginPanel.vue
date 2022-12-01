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
    <div>
        <h1>This is login page</h1>
    </div>
</template>

<script>
</script>

<style scoped>
#mainNavbar {
    background-color: #594236;
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
