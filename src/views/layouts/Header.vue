<template>
  <nav
    id="navbar"
    class="navbar justify-content-between"
    style="padding: 0 100px"
  >
    <router-link to="/">
      <img class="navbar-brand" src="../../../public/img/logo.png" alt="logo" />
    </router-link>

    <ul class="nav">
      <li class="nav-item">
        <router-link to="/" class="nav-link text-dark">Dashboard</router-link>
      </li>
      <li v-if="!isLoggedIn" class="nav-item">
        <router-link to="/login" class="nav-link text-dark">Login</router-link>
      </li>
      <li v-if="!isLoggedIn" class="nav-item">
        <router-link to="/register" class="nav-link text-dark">Register</router-link>
      </li>
      <li v-if="isLoggedIn" class="nav-item">
        <b-dropdown
          size="lg"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template #button-content>
              <!-- <i class="mdi mdi-account-circle menu-icon"></i> -->
            <b-avatar size="sm"></b-avatar>
            {{userDetail.name}}
          </template>
          <!-- <router-link to="register" class="nav-link">{{userDetail}}</router-link> -->

          <span>
              <b-dropdown-item>
                <router-link style="text-decoration: none; color: black" to="/pembayaran">
                  Pembayaran Kurban
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link style="text-decoration: none; color: black" to="/laporan">
                  Laporan Kurban
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link style="text-decoration: none; color: black" to="/sertifikat">
                  Sertifikat
                </router-link>
              </b-dropdown-item>
            <b-dropdown-item>
              <router-link style="text-decoration: none; color: black" to=""
                >Profile</router-link
              >
            </b-dropdown-item>
            <b-dropdown-item @click="logout">
              <span >Keluar</span>
            </b-dropdown-item>
          </span>

          <span style="text-align:center" v-if="!userDetail.alamat || !userDetail.kecamatan || !userDetail.kota || !userDetail.provinsi">
            <div class="col">
              <b-icon icon="exclamation-triangle" variant="danger"></b-icon>
                <!-- <i class="mdi mdi-account-circle menu-icon"></i> -->
            </div>
            <div class="col">
              <b-dropdown-text style="width: 240px;">
                Profil anda belum lengkap
              </b-dropdown-text>
            </div>
            <router-link to="profileCompletion">
              <b-button variant="warning" type="button" block
                >Lengkapi Profile
              </b-button>
            </router-link>
          </span>
        </b-dropdown>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return  {
      admin: true
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then((response) => {
          console.log(response);
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  computed: {
    userDetail() {
      return this.$store.getters.userDetail;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
      console.log(this.$store.getters.userDetail);
      return false
    if (this.$store.getters.userDetail.level == 'user') {
      this.admin = false
    } else {
      this.admin = true
    }
  }
};
</script>

<style></style>
