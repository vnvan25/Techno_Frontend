<template>
<v-parallax dark src="https://images.unsplash.com/photo-1582039724720-cbf932c17979?ixlib=rb-1.2.1&w=1000&q=80" height="710">
<v-container>
  <v-card
    style="margin-top: 10px; padding: 15px"
    class="mx-auto"
    max-width="500"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <span class="headline text-center justify-center">SMART DUSTBIN ADMIN<br>LOGIN PAGE</span>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Username" v-model="username"></v-text-field>
              </v-col>
              <v-col cols="12" style="margin-top: -30px">
                <v-text-field label="Password" v-model="password" type="password"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions class="text-center justify-center">
      <v-btn block color="success" @click="login()">LOGIN</v-btn>
    </v-card-actions>
  </v-card>
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
            @click="snackbar = false" 
        > 
            Close 
        </v-btn> 
    </v-snackbar>  
  </v-container> 
</v-parallax>
</template>
<script>
export default {
    data(){
        return {
            text: '',
            color: '',
            snackbar: false,
            username: '',
            password: '',
            pegawai : new FormData,
            user: [],
        }
    },
    methods:{
        login() {
            var url = this.$apiUrl + "/LoginAdmin";
            this.pegawai.append("username", this.username);
            this.pegawai.append("password", this.password);

            this.$http.post(url, this.pegawai).then(response => {
                if (response.data.token) {
                    this.user = response.data
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("username", response.data.pegawai.username);
                    localStorage.setItem("peran", "admin")
                    
                    this.snackbar = true;
                    this.color = "green";
                    this.text = "Your Login is Success";

                    this.$router.push({ path : "homeAdmin"})

                } else {
                    this.snackbar = true;
                    this.text = "Invalid Username or Password!";
                    this.color = "red";
                    this.load = false;
                }
            });
            },
            resetform(){
                this.username= '',
                this.password=''
            }
    }
}
</script>