<template>
  <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="600">
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="4">
            <v-layout>
            <v-flex xs10 offset-xs4>
              <v-card dark color="purple">
                <v-img position="center" width="650px" height="450px" src="https://svgur.com/i/jJ.svg"></v-img>
              </v-card>
            </v-flex>
            </v-layout>
          </v-col>
          <v-col cols="8">
            <v-layout>
            <v-flex xs9 offset-xs1>
              <v-card class="pa-md-4 mx-lg-auto" color="rgb(0, 0, 0, 0.2)">
                <h1 class="display-2 text-center font-weight-thin white--text ">Your Profile</h1>
                <v-text-field
                        label="Name"
                        :placeholder= this.name
                        filled
                        rounded
                        dense
                        background-color="#E6E6FA"
                        class="ml-5 mt-4 mr-5 font-weight-black title"
                        :disabled="disable"
                        v-model="name"
                ></v-text-field>
                <v-text-field
                        label="Email"
                        :placeholder= this.email
                        filled
                        rounded
                        dense
                        background-color="#E6E6FA"
                        class="ml-5 mt-1 mr-5 font-weight-black title"
                        :disabled="disable"
                        v-model="email"
                ></v-text-field>
                <v-text-field
                        label="Address"
                        :placeholder= this.address
                        filled
                        rounded
                        dense
                        background-color="#E6E6FA"
                        class="ml-5 mt-1 mr-5 font-weight-black title"
                        :disabled="disable"
                        v-model="address"
                ></v-text-field>
                <v-text-field
                        label="Phone"
                        :placeholder= this.phone
                        filled
                        rounded
                        dense
                        background-color="#E6E6FA"
                        class="ml-5 mt-1 mr-5 font-weight-black title"
                        :disabled="disable"
                        v-model="phone"
                ></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                <div v-if="disable==true">
                    <v-btn class="mx-2" fab dark medium color="cyan" @click="disable=false">
                        <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn class="mx-2" fab dark medium color="green" @click="edit(); disable=true">
                        <v-icon dark>mdi-check-all</v-icon>
                    </v-btn>
                </div>
                </v-card-actions>
              </v-card>
            </v-flex>
            </v-layout>
          </v-col>
        </v-row>
        <v-snackbar
            v-model="snackbar"
            :color="color"
            :multi-line="true"
            :timeout="3000"
            >
            {{ text }}
            <v-btn
            dark
            text
            @click="snackbar= false"
            >
            Close
            </v-btn>
            </v-snackbar>
  </v-parallax>
</template>
<script>
  export default {
    data () {
      return {
        snackbar: false,
        color: null,
        text: '',
        load: false,
        disable: true,
        name: localStorage.getItem("nama"),
        address: localStorage.getItem("alamat"),
        phone: localStorage.getItem("nohp"),
        email: localStorage.getItem("myemail"),
        id: localStorage.getItem("id"),
        nama: '',
        mail: '',
        number: '',
        alamat: '',
        data: new FormData,
      }
    },
    methods: {
        edit(){
            this.data.append('nama', this.name);
            this.data.append('nohp', this.phone);
            this.data.append('alamat', this.address);
            this.data.append('email', this.email);
            var uri =this.$apiUrl + '/profile/'+this.id
            this.load = true
            this.$http.post(uri, this.data).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = "Success Edit Profile";
                this.load = false;
            }).catch(error =>{
                this.load = false;
            })
            localStorage.setItem("myemail" , this.email)
            localStorage.setItem("alamat" , this.address)
            localStorage.setItem("nama", this.name)
            localStorage.setItem("nohp", this.phone)
        },
    },
  }
</script>