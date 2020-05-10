
<template>
<div>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">SMART DUSTBIN ORDER SHOP</h1>
    </v-card-title>

    <v-tabs
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab link to="home">
        Home
      </v-tab>
      <v-tab>
         <div>
            <v-menu :offset-x="true">
            <template v-slot:activator="{ on: menu }">
                    <v-btn
                    color="primary"
                    dark
                    text
                    block
                    v-on="{ ...menu }"
                    >Order Page</v-btn>
            </template>
            <v-list>
                <v-list-item>
                <v-btn text link to="order"> Order Now</v-btn>
                </v-list-item>
                <v-list-item>
                <v-btn text link to="listOrder">My List Order </v-btn>
                </v-list-item>
            </v-list>
            </v-menu>
        </div>
      </v-tab>
      <v-tab link to="about">
        About
      </v-tab>
      <v-tab link to="profile">
        Profile
      </v-tab>
      <v-tab link to="logout">
        Logout
      </v-tab>
    </v-tabs>
  </v-card>
  <VContent >
      <router-view />
  </VContent>
</div>
</template>

<script>
export default {
    data() {
        return {
           
        }
    },
    mounted(){
      if(localStorage.getItem('token'))
      {
          this.$router.push({ name: "Home" });
      }
      else
      {
         this.$router.push({ name: "Login" });
      }
    },
}
</script>

<style>
/* Helper classes */
.basil {
  background-color: #FFFFFF !important;
}
.basil--text {
  color: #356859 !important;
}
</style>