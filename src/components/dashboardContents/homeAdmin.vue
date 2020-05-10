<template>
    <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        height="600"
      >
      <v-row align="center" justify="center">
         <h1 class="text-center mt-5">Manage Smart Dustbin Shop</h1>
      </v-row>
      <v-row
          
        >
          <v-col cols="6">
            <v-layout>
            <v-flex xs8 offset-xs2>
             <v-card
                    color="#6495ED"
                    dark
                >
                    <v-card-title class="headline">List Order Customer</v-card-title>

                    <v-card-subtitle>Manage What Customer Order in your Order Page and Verified the Order. So customer's order can be delivered.</v-card-subtitle>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                    <v-btn text link to="listOrderPage">Manage Now</v-btn>
                    </v-card-actions>
          </v-card>
            </v-flex>
            </v-layout>
          </v-col>
          <v-col cols="6">
            <v-layout>
            <v-flex xs8 offset-xs1>
              <v-card
                color="#1E90FF"
                dark
                >
                <v-card-title class="headline">Manage Products</v-card-title>

                <v-card-subtitle>Add or Update Your Products to give up to date information to your customer.</v-card-subtitle>

                <v-card-actions>
                    <v-spacer></v-spacer>
                <v-btn text link to="products">Manage Now</v-btn>
                </v-card-actions>
            </v-card>
            </v-flex>
            </v-layout>
          </v-col>
        </v-row>
        
  </v-parallax>
</template>

<script>
export default {
    data: () => ({
      
    }),
    mounted(){
   
    },
  }
</script>
