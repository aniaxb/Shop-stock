<template>
  <div class="text-center fs-1 fw-bold mb-5">Welcome to ShoeStock!</div>
  <div class="row d-flex justify-content-center align-items-center mx-0">
    <div class="col-3 mx-5">
      <p class="fs-5">
        Our website, <span class="fw-bold">ShoeStock</span>, specializes in
        selling limited edition sneakers. Our inventory is constantly updated
        with the latest and most sought-after designs from top brands, including
        Nike, Adidas, and Converse. We pride ourselves on offering a wide
        selection of sizes and styles to suit any taste, and our team of sneaker
        experts is always on hand to help customers find the perfect pair. With
        fast and reliable shipping, easy returns, and secure online payments,
        <span class="fw-bold">ShoeStock</span> is the go-to destination for
        sneaker collectors and enthusiasts around the world.
      </p>
    </div>
    <div class="col-6">
      <!-- <img src="/undraw_web_shopping_re_owap (1).svg" alt="" /> -->
      <img src="/ootd.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.body.style.backgroundColor = "#e9f1f7";
  },
};
</script>

<style scoped>
img {
  max-width: 730px;
  max-height: 530px;
}
</style>
