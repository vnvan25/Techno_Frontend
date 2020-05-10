<template>
<v-parallax dark src="https://images.unsplash.com/photo-1582039724720-cbf932c17979?ixlib=rb-1.2.1&w=1000&q=80" height="710">
<v-container>
  <v-card
    style="margin-top: 5px; padding: 15px"
    class="mx-auto"
    max-width="500"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <span class="headline text-center justify-center">SMART DUSTBIN SHOP <br>LOGIN PAGE</span>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email" v-model="form.email"></v-text-field>
              </v-col>
              <v-col cols="12" style="margin-top: -30px">
                <v-text-field label="Password" v-model="form.password" type="password"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions class="text-center justify-center">
      <v-btn block color="success" @click="login()">LOGIN</v-btn>
    </v-card-actions>

     <v-col cols="12">
        <p class="text-center justify-center">Have not registered?  <a href="/register">Register</a></p>
      </v-col>
  </v-card>
  <v-card
    style="margin-top: 50px; padding: 15px"
    class="mx-auto"
    max-width="500"
    outlined
  >
   <p class="text-center justify-center mt-4"><v-btn block color="#F4A460" link to="loginAdmin">I'm Admin</v-btn></p>
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
            form : {

                email: null, 
                password: null,
            },
            user : new FormData,
        }
    },
    methods:{
        login(){
            var url = this.$apiUrl + '/auth'
            this.user = new FormData()
            this.user.append('email',this.form.email);
            this.user.append('password',this.form.password);
            this.$http.post(url,this.user).then(response =>{
                if(response.data.token){
                  console.log(response.data)
                    localStorage.setItem("token" , response.data.token)
                    localStorage.setItem("myemail" , this.form.email)
                    localStorage.setItem("alamat" , response.data.user.alamat)
                    localStorage.setItem("id" , response.data.user.id)
                    localStorage.setItem("nama", response.data.user.nama)
                    localStorage.setItem("nohp", response.data.user.nohp)
                    localStorage.setItem("peran", "user")
                    
                    this.snackbar=true; //mengaktifkan snackbar
                    this.color='green'; //memberi warna snackbar
                    this.text=response.data.message; //memasukkan pesan kesnackbar
                    this.load=false;
                    if(this.form.email == "admin@gmail.com")
                    {
                        localStorage.setItem("email" , "admin")
                        this.$router.push({ path : "item"})
                    }
                    else
                    {
                        localStorage.setItem("email" , "user")
                        this.$router.push({ path : "home"})
                    }
                }else{
                    alert('gagal login')
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load=false;
                }
            })
        },
    }
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