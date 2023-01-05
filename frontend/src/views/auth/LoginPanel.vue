<template>
  <div class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-12 justify-content-center d-flex flex-row">
          <div id="loginUser" class="flext-item rounded p-5">
            <h2 class="text-center fw-bold">Sign-In</h2>
            <form @submit="loginUser" class="form-group pt-4 pl-4 pr-4">
              <div class="form-group my-2">
                <label>Username</label>
                <input
                  v-model="email"
                  type="text"
                  class="form-control"
                  placeholder="email"
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="password"
                />
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn mt-3 col-12">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Network} from "../../helpers/network";
import {SweetAlert} from "../../helpers/sweetAlert";

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },

  methods: {
    async loginUser(e) {
      e.preventDefault();
      Network.loginUser(this.email, this.password).then(result => {
        this.$router.replace("/browse");
        localStorage.setItem("token", result);
        localStorage.setItem("username", this.email);
        console.log("Login successful");
        SweetAlert.accepted(this.$swal, "Successfully logged in!").then(function () {
          window.location.reload();
        });
      }).catch((err) => {
        console.log("err", err.response.data.message);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
    },
  },

  created() {
    document.body.style.backgroundColor = "#e9f1f7";
  },

  mounted() {},
};
</script>

<style scoped>
button {
  background: #48acf0;
}
#loginUser {
  border: 2px solid #48acf0;
}
</style>
