<template>
  <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="600">
        <v-card class="ml-9 mr-9" color="#4682B4" dark>
            <v-container>
                <h2 class="text-center">Products Management Page</h2>
                <v-divider></v-divider>
                <v-layout>
                    <v-flex xs6>
                        <v-btn rounded color="green lighten-2" class="ml-2 mt-5" @click="dialog = true">
                            <v-icon class="mr-2">mdi-plus</v-icon>
                            Add New Products
                        </v-btn>
                    </v-flex>
                    <v-flex xs5 class="text-right">
                        <v-text-field
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search Products"
                        hide-details
                        class="mt-4"
                    ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-data-table
                        hide-default-footer
                        :headers="headers"
                        :items="products"
                        :search="keyword"
                        class="ml-3 mt-5">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_barang">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.kode }}</td>
                                <td>{{ item.nama }}</td>
                                <td>Rp.{{ item.harga }}</td>
                                <td>{{ item.stok }}</td>
                                <td>
                                    <v-btn
                                    icon
                                    color="indigo"
                                    light
                                    @click="editHandler(item)"
                                    >
                                    <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn
                                    icon
                                    color="error"
                                    light
                                    @click="delData(item.id_barang)"
                                    >
                                    <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card color="#E6E6FA">
                <v-card-title>
                    <span class="headline">Add New Products to Sell</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Product Name*" v-model="form.name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Price*" v-model="form.price"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Stock*" v-model="form.stok"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog=false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="sendData()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogEdit" persistent max-width="600px">
            <v-card color="#E6E6FA">
                <v-card-title>
                    <span class="headline">Update Products Data Details</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Product Code" v-model="form.kode" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Product Name*" v-model="form.name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Price*" v-model="form.price"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Stock*" v-model="form.stok"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogEdit=false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="sendDataEdit()">Save</v-btn>
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
        dialogEdit: false,
        dialog: false,
        dialogJumlah: false,
        name: localStorage.getItem("nama"),
        id: localStorage.getItem("id"),
        title: 'List Products Order ',
        status: new FormData(),
        produk: new FormData(),
        products: [],
        jumlah: 0,
        keyword: '',
        snackbar: false,
        color: null,
        text: '',
        load: false,
        form: {
            name: '',
            price: '',
            stok: '',
            kode: '',
            id: ''
        },
        headers: [
            {
                text: 'No',
                value: 'no',
            },
            {
                text: 'Products Code',
                value: 'kode',
            },
            {
                text: 'Products Name',
                value: 'nama',
            },
            {
                text: 'Price',
                value: 'harga',
            },
            {
                text: 'Stock',
                value: 'stok',
            },
            {
                text: 'Action',
                value: '',
            },
        ],
        id: 0,
      }
    },
    methods: {
        getDataOrder(){
            var uri = this.$apiUrl + '/produk'
            this.$http.get(uri).then( (response) =>{
                this.products=response.data
            })
        },
        getCount(){
            var uri = this.$apiUrl + '/produk/count'
            this.$http.get(uri).then( (response) =>{
                this.id=response.data[0].id_barang
                this.id = this.id+1;
            })
        },
        sendData(){
            this.produk.append('kode', "BR-000"+this.id);
            this.produk.append('nama', this.form.name);
            this.produk.append('harga', this.form.price);
            this.produk.append('stok', this.form.stok);
            var uri =this.$apiUrl + '/produk'
            this.load = true
            this.$http.post(uri, this.produk).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = "Success Add Products";
                this.load = false;
                this.getDataOrder();
                this.dialog=false;
            }).catch(error =>{
                this.getDataOrder();
                this.dialog=false;
                this.load = false;
            })
        },
        delData(deleteId){
            var uri = this.$apiUrl + '/produk/' + deleteId;
            this.$http.delete(uri).then( response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = 'Success Delete';
                this.getDataOrder();
            }).catch(error =>{
                this.getDataOrder();
            })
        },
        editHandler(item){
            this.dialogEdit=true,
            this.form.name=item.nama,
            this.form.kode=item.kode,
            this.form.price=item.harga,
            this.form.stok=item.stok,
            this.form.id=item.id_barang
        },
        sendDataEdit(){
            this.produk.append('kode', this.form.kode);
            this.produk.append('nama', this.form.name);
            this.produk.append('harga', this.form.price);
            this.produk.append('stok', this.form.stok);
            var uri =this.$apiUrl + '/produk/'+this.form.id
            this.load = true
            this.$http.post(uri, this.produk).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = "Success Add Products";
                this.load = false;
                this.getDataOrder();
                this.dialogEdit=false;
            }).catch(error =>{
                this.getDataOrder();
                this.dialogEdit=false;
                this.load = false;
            })
        },
    },
    mounted(){
       this.getDataOrder();
       this.getCount();
    }
  }
</script>