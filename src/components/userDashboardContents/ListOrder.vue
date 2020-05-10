<template>
  <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="800">
        <v-card class="ml-9 mr-9" color="#4682B4" dark>
            <v-img
            height="200"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
            <v-row>
                <v-col
                class="text-right"
                cols="12"
                >
                </v-col>
                <v-row
                class="pa-4"
                align="center"
                justify="center"
                >
                <v-col class="text-center">
                    <h1>{{ name }}</h1>
                    <span class="grey--text text--lighten-1">{{ title }}</span>
                </v-col>
                </v-row>
            </v-row>
            </v-img>
            <v-container>
                <h2 class="text-center">This is Your Order List</h2>
                <v-divider></v-divider>
                <h5 class="ml-4 mt-5 mb-4"> NB : Click at Quantity's Rows If You Want Change the Sum of Quantity</h5>
                <v-data-table
                        hide-default-footer
                        :headers="headers"
                        :items="order"
                        class="ml-3 mt-5">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_order">
                                <td>{{ index + 1 }}</td>
                                <td>{{item.tanggal}}</td>
                                <td>{{ item.nama }}</td>
                                <td v-if="item.status!='Verified' &&  item.status!='Done'">
                                <v-edit-dialog
                                    :return-value.sync="item.jumlah"
                                    large
                                    persistent
                                    @save="save(item)"
                                    @cancel="cancel"
                                    @open="open"
                                    @close="close"
                                    >
                                    <div>{{ item.jumlah }}</div>
                                    <template v-slot:input>
                                        <div class="mt-4 title">Update Quantity</div>
                                    </template>
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="jumlah"
                                        label="Edit"
                                        single-line
                                        counter
                                        autofocus
                                        ></v-text-field>
                                    </template>
                                    </v-edit-dialog>
                                </td>
                                <td v-else>
                                    {{item.jumlah}}
                                </td>
                                <td>Rp.{{ item.total }}</td>
                                <td><v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip></td>
                                <td v-if="item.status=='Verified'">
                                    <v-btn
                                    small
                                    rounded
                                    color="#9370DB"
                                    light
                                    @click="updateStatus(item)"
                                    >
                                    order arrived
                                    </v-btn>
                                </td>
                                <td v-else-if="item.status=='Waiting For Payment'">
                                    <v-btn
                                    icon
                                    color="error"
                                    light
                                    @click="delDetail(item.id_order)"
                                    class="mr-5"
                                    >
                                    <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                    <v-btn
                                    color="orange darken-3"
                                    small
                                    light
                                    text
                                    @click="dialog=true; editHandler(item)"
                                    >
                                    Add Receipt
                                    </v-btn>
                                </td>
                                <td v-else-if="item.status=='Waiting For Confirmation'">
                                    <v-btn
                                    icon
                                    color="error"
                                    light
                                    @click="delDetail(item.id_order)"
                                    >
                                    <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                                <td v-else>
                                    Your Order is Done!
                                </td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
                    <br>
                    <h4 class="ml-4 mb-4"> TOTAL TRANSACTION : Rp.{{ total }}</h4>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" max-width="400">
            <v-card class="pa-md-4" >
            <!-- <v-file-input
                label="File input"
                filled
                prepend-icon="mdi-camera"
                @change="onFileUpload"
            ></v-file-input> -->
            <v-label>Your Receipt</v-label>
                <br>
                <input type="file" @change="onFileUpload">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="grey" @click="dialog=false">CLOSE</v-btn>
                <v-btn color="red" @click="saveData()">SAVE</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
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
        dialog: false,
        dialogJumlah: false,
        selectedFile: null,
        name: localStorage.getItem("nama"),
        id: localStorage.getItem("id"),
        id_order: 0,
        title: 'List Products Order ',
        jlh: new FormData(),
        status: new FormData(),
        receipt: new FormData(),
        order: [],
        jumlah: 0,
        snackbar: false,
        color: null,
        text: '',
        load: false,
        headers: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Date',
                    value: 'tanggal',
                },
                {
                    text: 'Name',
                    value: 'nama',
                },
                {
                    text: 'Quantity',
                    value: 'jumlah',
                },
                {
                    text: 'Price',
                    value: 'alamat',
                },
                {
                    text: 'Status',
                    value: 'status',
                },
                {
                    text: 'Edit',
                    value: '',
                },
            ],
      }
    },
    computed: {
        total: function(){
            return this.order.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        }
    },
    methods: {
        getDataOrder(){
            var uri = this.$apiUrl + '/order?id_customer=' +this.id
            this.$http.get(uri).then( (response) =>{
                this.order=response.data
            })
        },
        delDetail(deleteId){
            var uri = this.$apiUrl + '/order/' + deleteId;
            this.$http.delete(uri).then( response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = 'Success Delete';
                this.getDataOrder();
            }).catch(error =>{
                this.getDataOrder();
            })
        },
        updateJumlah(item){
            if(this.jumlah<=0){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Minimal Quantity is 1";
            }else{
                this.jlh.append('id_order', item.id_order);
                this.jlh.append('jumlah', this.jumlah);
                this.jlh.append('harga', item.harga);
                var uri =this.$apiUrl + '/order/changeJumlah'
                this.load = true
                this.$http.post(uri, this.jlh).then( (response) =>{
                    console.log(uri)
                    this.load = false;
                    this.snackbar = true
                    this.color = 'success'
                    this.text = 'Data saved'
                    this.jumlah = 0,
                    this.getDataOrder();
                }).catch(error =>{
                    this.getDataOrder();
                })
            }
        },
        updateStatus(item){
            this.$confirm("Do You Want to Verified this Order Has Arrived?").then(() => {
            this.status.append('id_order', item.id_order);
            this.status.append('status', "Done");
            var uri =this.$apiUrl + '/order/changeStatus'
            this.load = true
            this.$http.post(uri, this.status).then( (response) =>{
                console.log(uri)
                this.load = false;
                this.snackbar = true
                this.color = 'success'
                this.text = 'Thank You for Order Our Products'
                this.jumlah = 0,
                this.getDataOrder();
            }).catch(error =>{
                this.getDataOrder();
            })
            }); 
        },
        updateStatusPayment(item){
            this.status.append('id_order', this.id_order);
            this.status.append('status', "Waiting For Confirmation");
            var uri =this.$apiUrl + '/order/changeStatus'
            this.load = true
            this.$http.post(uri, this.status).then( (response) =>{
                this.getDataOrder();
            }).catch(error =>{
                this.getDataOrder();
            })
        },
        onFileUpload(event){
            this.selectedFile = event.target.files[0]
        },
        previewFiles() {
             this.files = this.$refs.myFiles.files
        },
        editHandler(item){
            this.id_order = item.id_order;
        },
        saveData(){
            this.saveReceipt();
            this.updateStatusPayment();
            this.dialog=false;
        },
        saveReceipt(item){
            this.receipt.append('id_order', this.id_order);
            this.receipt.append('gambar', this.selectedFile);
            var uri =this.$apiUrl + '/order/gambar'
            this.load = true
            this.$http.post(uri, this.receipt).then( (response) =>{
                this.load = false;
                this.snackbar = true
                this.color = 'success'
                this.text = 'Your Receipt Have Been Saved'
                this.getDataOrder();
            }).catch(error =>{
                this.getDataOrder();
            })
        },
        save(item) {
            console.log(item)
            this.updateJumlah(item)
        },
        cancel () {
            this.snackbar = true
            this.color = 'error'
            this.text = 'Canceled'
        },
        open () {
            this.snackbar = true
            this.color = 'info'
            this.text = 'Dialog opened'
        },
        close () {
            console.log('Dialog closed')
        },
        getColor(status){
            if (status == "Waiting For Confirmation") return 'yellow darken-2'
            else if (status == "Verified") return 'red'
            else if (status == "Waiting For Payment") return 'purple'
            else return 'green'
      },
    },
    mounted(){
       this.getDataOrder();
    }
  }
</script>