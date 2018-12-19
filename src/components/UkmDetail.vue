<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn block slot="activator" color="light-blue darken-4" dark>Detail</v-btn>
    <v-card>
      <v-toolbar dark color="light-blue darken-4" flat>
        <v-btn icon dark @click.native="dialog = !dialog">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Detail {{businessData.name}}</v-toolbar-title>
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
                <v-img :src="`http://sisuper.codepanda.id/business/getBusinessPicture/${this.logo}`" >
                </v-img>
              </v-flex>
              <v-flex xs5>
                <v-card>
                  <v-card-text class="px-0">
                    <v-list two-line subheader>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Nama UKM</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.name}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Pemilik Usaha</v-list-tile-title>
                          <v-list-tile-sub-title v-if="this.user != null">{{this.user.username}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Kategori</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.category}}</v-list-tile-sub-title>
                          <!-- <ukm-list-pengusaha-detail :userData="this.user"></ukm-list-pengusaha-detail> -->
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Email</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.email}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Telepon</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.phone}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Alamat</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.address}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Situs</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.site}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs5>
                <v-card>
                  <v-card-text class="px-0">
                    <v-list two-line subheader>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Berdiri pada</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.established_date}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Deskripsi</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.description}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Facebook</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.facebook}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Twitter</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.twitter}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Instagram</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.instagram}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Line</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.line}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Revenue</v-list-tile-title>
                          <v-list-tile-sub-title>{{businessData.revenue}}</v-list-tile-sub-title>
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
                  <v-card-title>Daftar Produk
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
                    :items="products"
                    :search="search"
                    :rows-per-page-items="[10,20,50,100]"
                  >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-left">{{ props.item.name }}</td>
                      <td class="text-xs-left">{{ props.item.price }}</td>
                      <td class="text-xs-left">{{ props.item.unit }}</td>
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
export default {
  props: ["businessData"],
  data() {
    return {
      search: '',
      dialog: false,
      tab: null,
      items: [
        'Detail', 'Produk', 'Sertifikat',
      ],
      logo: this.businessData.logo.split('.')[0].replace(" ", "%20"),
      user: [],
      products: [],
      headers: [
        { text: "Nama Produk", value: "name" },
        { text: "Harga", value: "price" },
        { text: "Satuan", value: "unit" },
        ]
    };
  },
  methods: {
  },
  async created(){
    try{
        const userResponse = await UserService.getUserById(this.businessData.user_id)
        const productsResponse = await ProductService.getProductsByBusinessId({
          businessId : this.businessData._id
        })
        this.user = userResponse.data.result
        this.products = productsResponse.data.result
        console.log("User : " )
        console.log(this.user)
        console.log("Produk : " )
        console.log(this.products)
      }
      catch(err){
        console.log(err)
      }
  }
};
</script>