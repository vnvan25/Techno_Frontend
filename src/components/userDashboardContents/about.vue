<template>
  <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        height="800"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="4">
            <v-layout>
            <v-flex xs10 offset-xs4>
              <v-card dark color="purple">
                <v-img position="center" width="650px" height="450px" src="https://i2.cdn.turner.com/money/dam/assets/160222132718-gif-wifi-trash-340xa.gif"></v-img>
              </v-card>
            </v-flex>
            </v-layout>
          </v-col>
          <v-col cols="8">
            <v-layout>
            <v-flex xs9 offset-xs1>
              <v-card class="pa-md-4 mx-lg-auto" color="rgb(0, 0, 0, 0.2)">
                <h1 class="display-2 font-weight-thin white--text ">Not Rubbish At All!</h1>
                <h4 class="subheading white--text mt-4">These smart bins have an LED screen that generates an access code whenever someone throws something in it. 
                  <br>In exchange, the person gets access to free WiFi for 15 minutes.</h4>

               <h4 class="subheading white--text mt-4">The company is now targeting large-scale projects like corporate offices, 
                 residential societies and shopping complexes. In the future, they also plan to expand and set up dustbins on the streets.</h4>

                 <h4 class="subheading white--text mt-4">The dustbin works in a very simple way, whenever someone throws trash in the WiFi dustbin, an access 
                   code is generated on the LED display in front of the bin. One can then use that access code to connect to the WiFi network of the dustbin. 
                   The process is quite simple. You have to throw the trash into bin. When you throw the trash the Wifi Trash bin will detect that there is a 
                   new trash into the bin. the LED light is displayed with a unique code on it. 
                   This is your Access code, and you can use this code to use free Wifi. The Wifi service is provided by the MTS which is a sponsored for this project.</h4>
              </v-card>
            </v-flex>
            </v-layout>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="18" sm="12">
            <v-card color="rgb(0, 0, 0, 0.1)">
              <v-container>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-img
                        src="https://www.bioenabletech.com/wp-content/uploads/2016/06/Smart_Bins_Smart_City.png"
                      ></v-img>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201508/dustbin-wifi_143981528821_647x404_081715061103.jpg">
                      </v-img>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-img src="https://i2.wp.com/blog.onclickinnovations.com/wp-content/uploads/2016/08/wifi.jpg?resize=732%2C412&ssl=1">
                      </v-img>
                    </v-col>
                  </v-row>
                </v-container>
            </v-card>
          </v-col>
  </v-row>
  </v-parallax>
</template>