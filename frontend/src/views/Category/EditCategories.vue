<template>
  <div class="text-center">Categories</div>
  <div class="" id="divTable">
    <table class="table table-light table-striped mt-5 text-center">
      <thead class="">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <button v-on:click="edit()" class="btn btn-sm text-black">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
    };
  },

  methods: {
    fetchCategories() {
      axios
        .get("http://localhost:3000/categories", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.categories = res.data;
            // console.log(this.categories);
          }
        })
        .catch((err) => console.log("err", err.response.data));
    },
  },
  created() {
    // #CCDDE2
    document.body.style.backgroundColor = "#e9f1f7";
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchCategories();
  },
};
</script>

<style scoped>
#divTable {
  margin-left: 10%;
  margin-right: 10%;
}
button {
  background: #48acf0;
}
</style>
