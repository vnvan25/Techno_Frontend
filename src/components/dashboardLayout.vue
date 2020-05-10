
<template>
<div>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">SMART DUSTBIN ADMIN PAGE</h1>
    </v-card-title>

    <v-tabs
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab link to="homeAdmin">
        Home
      </v-tab>
      <v-tab link to="listOrderPage">
        List Order Customer
      </v-tab>
      <v-tab link to="products">
        Manage Product
      </v-tab>
      <v-tab link to="report">
        Sales Report
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
          this.$router.push({ name: "HomeAdmin" });
      }
      else
      {
         this.$router.push({ name: "LoginAdmin" });
      }
    },
}
</script>