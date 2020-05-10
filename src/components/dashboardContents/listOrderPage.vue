<template>
  <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="1100">
        <v-card class="ml-9 mr-9" color="#4682B4" dark>
            <v-container>
                <h2 class="text-center">This is Your Customer Order List</h2>
                <v-divider></v-divider>
                <v-data-table
                        hide-default-footer
                        :headers="headers"
                        :items="order"
                        class="ml-3 mt-5">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_order">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.customer }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.jumlah }}</td>
                                <td>Rp. {{ item.total }}</td>
                                <td><img :src="'http://localhost:5002/Backend/upload/' + item.gambar" width="100px"></td>
                                <td><v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip></td>
                                <td v-if="item.status=='Verified'">
                                    <v-btn rounded small color="#708090" light disabled>
                                        Confirmed
                                    </v-btn>
                                </td>
                                <td v-else-if="item.status=='Done'">
                                        This order is already finish!
                                </td>
                                <td v-else>
                                    <v-btn rounded small color="#708090" light @click="updateStatus(item)">
                                        Confirm Order
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
                    <p class="mt-4 ml-4">Status Information : </p>
                    <v-timeline dense>
                    <v-row>
                    <v-timeline-item>
                        <v-card max-width="270" color="yellow darken-3">
                        <v-card-title class="Title">Waiting For Confirmation</v-card-title>
                        <v-card-text>
                            The customer waits for his order to be confirmed by the admin to find out whether the item is available or not
                        </v-card-text>
                        </v-card>
                    </v-timeline-item>

                    <v-timeline-item>
                        <v-card max-width="250" color="red">
                        <v-card-title class="Title">Verified</v-card-title>
                        <v-card-text>
                            The customer's order was successfully verified by the admin, so the product could be sent
                        </v-card-text>
                        </v-card>
                    </v-timeline-item>

                    <v-timeline-item>
                        <v-card max-width="250" color="green">
                        <v-card-title class="Title">Done</v-card-title>
                        <v-card-text>
                            The order has arrived at the customer's address and the order process is complete
                        </v-card-text>
                        </v-card>
                    </v-timeline-item>
                    </v-row>
                    </v-timeline>
            </v-container>
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
        name: localStorage.getItem("nama"),
        id: localStorage.getItem("id"),
        title: 'List Products Order ',
        status: new FormData(),
        order: [],
        reverse: true,
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
                    text: 'Customer',
                    value: 'customer',
                },
                {
                    text: 'Products',
                    value: 'name',
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
                    text: 'Receipt',
                    value: 'gambar',
                },
                {
                    text: 'Status',
                    value: 'status',
                },
                {
                    text: 'Action',
                    value: '',
                },
            ],
      }
    },
    methods: {
        getDataOrder(){
            var uri = this.$apiUrl + '/order'
            this.$http.get(uri).then( (response) =>{
                this.order=response.data
            })
        },
        getColor(status){
            if (status == "Waiting For Confirmation") return 'yellow darken-2'
            else if (status == "Verified") return 'green'
            else return 'red'
        },
        updateStatus(item){
            this.$confirm("Do You Want to Verified this Order?").then(() => {
            this.status.append('id_order', item.id_order);
            this.status.append('status', "Verified");
            var uri =this.$apiUrl + '/order/changeStatus'
            this.load = true
            this.$http.post(uri, this.status).then( (response) =>{
                console.log(uri)
                this.load = false;
                this.snackbar = true
                this.color = 'success'
                this.text = 'Data Verified'
                this.jumlah = 0,
                this.getDataOrder();
            }).catch(error =>{
                this.getDataOrder();
            })
            }); 
        },
    },
    mounted(){
       this.getDataOrder();
    }
  }
</script>