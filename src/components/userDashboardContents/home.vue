<template>
    <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        height="600"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center" cols="12">
            <v-layout>
            <v-flex xs2 offset-xs5>
              <v-card dark color="purple">
                <v-img position="center" width="250px" height="250px" src="https://i2.cdn.turner.com/money/dam/assets/160222132718-gif-wifi-trash-340xa.gif"></v-img>
              </v-card>
            </v-flex>
            </v-layout>
            <h1 class="display-1 font-weight-thin mb-4 mt-4">Smart Dustbin Blog Website Order!</h1>
            <h4 class="subheading">These smart bins have an LED screen that generates an access code whenever someone throws something in it. 
              <br>In exchange, the person gets access to free WiFi for 15 minutes.</h4>
              <v-btn class="mt-4" rounded color="red lighten-2" link to="order">ORDER NOW</v-btn>
          </v-col>
        </v-row>
  </v-parallax>
</template>

<script>
export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
    mounted(){
    
    },
  }
</script>
