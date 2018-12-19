<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn block slot="activator" color="light-blue darken-4" dark>Detail</v-btn>
    <v-card>
      <v-toolbar dark color="light-blue darken-4" flat>
        <v-btn icon dark @click.native="dialog = !dialog">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Detail </v-toolbar-title>
        <v-tabs
          slot="extension"
          v-model="tab"
          color="light-blue darken-4"
          grow
        >
          <v-tabs-slider color="cyan"></v-tabs-slider>
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="tab">
        <v-tab-item
          :key="items[0]"
          centered
        >
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs2>
                <v-img :src="`http://sisuper.codepanda.id/users/profilePicture/${userData._id}`" >
                </v-img>
              </v-flex>
              <v-flex xs10>
                <v-card>
                  <v-card-text class="px-0">
                    <v-list two-line subheader>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Nama Pengusaha</v-list-tile-title>
                          <v-list-tile-sub-title>{{userData.username}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Email</v-list-tile-title>
                          <v-list-tile-sub-title v-if="this.user != null">{{userData.email}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Phone</v-list-tile-title>
                          <v-list-tile-sub-title>{{userData.phone}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Alamat</v-list-tile-title>
                          <v-list-tile-sub-title>{{userData.address}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Jumlah Bisnis</v-list-tile-title>
                          <v-list-tile-sub-title>{{count}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Suspend User</v-list-tile-title>
                          <v-list-tile-sub-title>
                            <v-dialog v-model="suspendDialog" persistent max-width="290" v-if="userData.account_status == 1">
                              <v-btn block color="light-blue darken-4" dark slot="activator">Suspend</v-btn>
                              <v-card>
                                <v-card-title class="headline text-md-center">Apakah anda yakin?</v-card-title>
                                <v-card-text>Pengusaha yang disuspend dari tidak dapat melakukan login ke dalam sistem.</v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red darken-4" flat @click="suspendDialog = false">Batal</v-btn>
                                  <v-btn color="green darken-4" flat @click="suspendUser">Suspend</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <v-dialog v-model="suspendDialog" persistent max-width="290" v-else>
                              <v-btn block color="red darken-4" dark slot="activator">Unsuspend</v-btn>
                              <v-card>
                                <v-card-title class="headline text-md-center">Apakah anda yakin?</v-card-title>
                                <v-card-text>Pengusaha yang dibatalkan status suspendnya akan dapat login kembali ke dalam sistem.</v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red darken-4" flat @click="suspendDialog = false">Batal</v-btn>
                                  <v-btn color="green darken-4" flat @click="unsuspendUser">Unsuspend</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
        <v-tab-item
          :key="items[1]"
          centered
        >
          <v-container grid-list-md text-xs-left fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-title>UKM yang dimiliki
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="headers"
                    :items="businesses"
                    :search="search"
                    :rows-per-page-items="[10,20,50,100]"
                  >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-left">{{ props.item.name }}</td>
                      <td class="text-xs-left">{{ props.item.category }}</td>
                      <td class="text-xs-left">{{ props.item.email }}</td>
                      <td class="text-xs-left">{{ props.item.address }}</td>
                      <td class="text-xs-left">{{ props.item.phone }}</td>
                      <td class="text-xs-left"><ukm-detail :businessData="props.item"></ukm-detail></td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
        <v-tab-item
          :key="items[2]"
          centered
        >
          <v-container grid-list-md text-xs-left fluid>
            <v-layout>
              <v-flex xs12 sm8 offset-sm2>
                <v-card>
                  <v-container grid-list-sm fluid>
                    <v-layout row wrap>
                      <v-flex
                        v-for="n in 9"
                        :key="n"
                        xs12
                        d-flex
                      >
                        <v-card flat tile class="d-flex">
                          <v-img
                            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                          >
                            <v-layout
                              slot="placeholder"
                              fill-height
                              align-center
                              justify-center
                              ma-0
                            >
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                          </v-img>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
  
</template>

<script>
import store from "@/store/store.js"
import BusinessService from '@/services/BusinessService'
import UserService from '@/services/UserService'
import ProductService from '@/services/ProductService'
import UkmDetail from '@/components/UkmDetail'
export default {
  props: ["userData"],
  components:{
    UkmDetail
  },
  data() {
    return {
      search: '',
      dialog: false,
      suspendDialog: false,
      tab: null,
      items: [
        'Detail', 'Daftar UKM yang dimilik', 'Sertifikat',
      ],
      // logo: this.businessData.logo.split('.')[0].replace(" ", "%20"),
      user: [],
      products: [],
      businesses: [],
      count: 0,
      headers: [
        { text: "Nama UKM", value: "name" },
        { text: "Kategori", value: "category" },
        { text: "Email", value: "email" },
        { text: "Alamat", value: "address" },
        { text: "Telepon", value: "phone" },
        { text: "Detail", value: "detail" },
        ]
    };
  },
  methods: {
    async suspendUser(){
      try{
        await UserService.suspend(this.userData._id).then(res => {
          this.userData.account_status = 0
        })
      }catch(err){
        console.log(err)
      }
      this.suspendDialog = false
    },
    async unsuspendUser(){
      try{
        await UserService.unsuspend(this.userData._id).then(res => {
          this.userData.account_status = 1
          this.suspendDialog = false
        })
      }catch(err){
        console.log(err)
      }
      this.suspendDialog = false
    }
  },
  async created(){
    try{
      await BusinessService.getUserBusiness({
        userId: this.userData._id
      }).then((res) => {
        this.businesses = res.data.result
        this.count = this.businesses.length
      })
        // const userResponse = await UserService.getUserById(this.businessData.user_id)
        // const productsResponse = await ProductService.getProductsByBusinessId({
        //   bussinessId : this.businessData._id
        // })
        // this.user = userResponse.data.result
        // this.products = productsResponse.data.result
        // console.log("User : " )
        // console.log(this.user)
        // console.log("Produk : " )
        // console.log(this.products)
      }
      catch(err){
        console.log(err)
      }
  }
};
</script>