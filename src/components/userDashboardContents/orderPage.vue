<template>
  <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="1000">
        <v-card
        class="ml-9 mr-9"
            color="#4682B4"
            dark
        >
            <template v-slot:progress>
            <v-progress-linear
                absolute
                color="green lighten-3"
                height="8"
                indeterminate
            ></v-progress-linear>
            </template>
            <v-img
            height="200"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
            <v-row>
                <v-col
                class="text-right"
                cols="12"
                >
                <v-menu
                    bottom
                    left
                    transition="slide-y-transition"
                >
                    <template v-slot:activator="{ on }">
                    <v-btn
                        icon
                        v-on="on"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    </template>
                </v-menu>
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
            <v-form>
            <v-container>
                <h2 class="text-center">Buyer Profile</h2>
                <v-divider></v-divider>
                <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                    v-model="name"
                    filled
                    color="blue-grey lighten-2"
                    label="Name"
                    disabled
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                    v-model="email"
                    filled
                    color="blue-grey lighten-2"
                    label="Email"
                    disabled
                    ></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                    v-model="address"
                    filled
                    color="blue-grey lighten-2"
                    label="Address"
                    disabled
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                    v-model="phone"
                    filled
                    color="blue-grey lighten-2"
                    label="Phone Number"
                    disabled
                    ></v-text-field>
                </v-col>
                </v-row>
                <h2 class="text-center">Buy Description</h2>
                <v-divider></v-divider>
                <v-row>
                    <v-col
                    cols="12"
                    md="6"
                >
                <h4 class="text-center mt-5 ml-2">LIST PRODUCTS</h4>
                <v-divider></v-divider>
                <small class="ml-3 mt-3">*Click on list to add products</small>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                >
                 <h4 class="text-center mt-5 ml-2">YOUR CART</h4>
                 <v-divider></v-divider>
                    </v-col>
                </v-row>
                <v-row>
                
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-data-table
                        hide-default-footer
                        hide-default-header
                        :items="products"
                        class="ml-3">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_barang" :class="selectedRows.indexOf(item.id_barang)>-1?'green lighten-1':''" @click="rowClicked(item)">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.kode }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.stok }}</td>
                                <td>{{ item.harga }}</td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                <v-data-table
                        hide-default-footer
                        hide-default-header
                        :items="order"
                        class="ml-3">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_order">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>
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
                                <td>{{ item.total }}</td>
                                <td class="text-center">
                                    <v-btn
                                    icon
                                    color="error"
                                    light
                                    @click="delDetail(item.id_order)"
                                    >
                                    <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
                    <br>
                    <h4 class="ml-4 mb-4"> TOTAL TRANSACTION : Rp.{{ total }}</h4>
                </v-col>
                </v-row>
            </v-container>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue-grey darken-3"
                depressed
                class="mr-5"
                link to="listOrder"
            >
                <v-icon left>mdi-update</v-icon>
                    Save Data
            </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialogJumlah" persistent max-width="300px">
            <v-card>
                <v-card-title>Input Quantity</v-card-title>
                <v-text-field v-model="jumlah" class="ml-4 mr-4" min="1" placeholder="Quantity" outlined type="number"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="simpan()">OK</v-btn>
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
        dialogJumlah: false,
        products: [],
        order: [],
        autoUpdate: true,
        selectedItem: '',
        selectedRows: [],
        snackbar: false,
        color: null,
        text: '',
        load: false,
        friends: ['Sandra Adams', 'Britta Holt'],
        name: localStorage.getItem("nama"),
        address: localStorage.getItem("alamat"),
        phone: localStorage.getItem("nohp"),
        email: localStorage.getItem("myemail"),
        id: localStorage.getItem("id"),
        title: 'Smart Dustbin Order ',
        data:{
            id_barang: '',
            harga : '',
            nama: '',
            tempIdBarang: '',
            stok: 0,
            kode: 0,
        },
        jumlah:0,
        dtl: new FormData(),
        jlh: new FormData(),
        tgl: new Date().toISOString(),
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
        remove (item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
            },
        getData(){
            var uri = this.$apiUrl + '/produk'
            this.$http.get(uri).then( (response) =>{
                this.products=response.data
            })
        },
        getDataOrder(){
            var uri = this.$apiUrl + '/order/orderStatus?id_customer=' +this.id
            this.$http.get(uri).then( (response) =>{
                this.order=response.data
            })
        },
        rowClicked(row) {
            if(row.stok<1){
                this.snackbar = true;
                this.text = 'You Cannot Order this products. Ask the Admin to restock this product, if you really want this products';
                this.color = 'red';
            }else{
                this.data.tempIdBarang = row.id_barang;
                this.data.id_barang = row.id_barang;
                this.data.stok =  row.stok;
                this.data.nama = row.nama;
                this.data.kode = row.kode;
                this.data.harga = row.harga;
                this.sendHandler(row);
            }
        },
        sendHandler(row){
            this.swapSelectionStatus(row.id_barang);
            this.log(row);
        },
        swapSelectionStatus(keyID) {
            if (this.selectedRows.includes(keyID)) {
                this.selectedRows = this.selectedRows.filter(
                selectedKeyID => selectedKeyID !== keyID
                );
                this.delDetail(keyID);
            } else {
                this.dialogJumlah = true;
                this.selectedRows.push(keyID);
            }
        },
        log(logItem){
            console.log(logItem);
        },
        simpan(){
            if(this.jumlah<=0){
                this.snackbar = true;
                this.text = 'Quantity Cannot Fill with Zero 0';
                this.color = 'red';
            }else{
                this.sendDetail();
            }
        },
        sendDetail(){
            this.dialogJumlah = true;
            if(this.jumlah<=0){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Quantity Cannot Fill with Zero (0)";
            }else{
                this.dtl.append('id_customer', this.id);
                this.dtl.append('id_barang', this.data.id_barang);
                this.dtl.append('jumlah', this.jumlah);
                this.dtl.append('total', this.data.harga*this.jumlah);
                this.dtl.append('status', "Waiting For Payment");
                this.dtl.append('alamat', this.address);
                this.dtl.append('no_hp', this.phone);
                this.dtl.append('tanggal', this.tgl);
                var uri =this.$apiUrl + '/order'
                this.load = true
                this.$http.post(uri, this.dtl).then(response =>{
                    this.snackbar = true;
                    this.color = 'green';
                    this.text = "Success Add Products";
                    this.load = false;
                    this.getDataOrder();
                    this.dialogJumlah=false;
                    this.jumlah=0;
                }).catch(error =>{
                    this.getDataOrder();
                    this.dialogJumlah=false;
                    this.load = false;
                })
            }
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
    },
    mounted(){
        this.getData();
    }
  }
</script>