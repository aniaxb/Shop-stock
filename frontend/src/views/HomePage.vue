<template>
  <div>
    <h1>Hello HomePage</h1>
  </div>
</template>

<script>
export default {
  created() {
    document.body.style.backgroundColor = "#f5f5f5";
  },
};
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
