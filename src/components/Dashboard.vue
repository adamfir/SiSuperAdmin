<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex md12>
        <div class="white elevation-2">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <h1>Dashboard</h1>
          </div>
        </div>
      </v-flex>
      <v-flex xs3>
        <v-card >
          <v-card-text class="px-0">
            <div>
              <div class="headline">Jumlah Pengusaha</div>
              <h1>22</h1>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="navigateTo(`ukmListPengusaha`,`UKM`)">Lihat</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card color="blue darken-2" dark>
          <v-card-text class="px-0">
            <div>
              <div class="headline">Jumlah UKM</div>
              <h1>50</h1>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="navigateTo(`ukmList`,`UKM`)">Lihat</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-text class="px-0">
            <div>
              <div class="headline">Jumlah Event</div>
              <h1>15</h1>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="navigateTo(`eventList`,`Event`)">Lihat</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card color="blue darken-2" dark>
          <v-card-text class="px-0">
            <div>
              <div class="headline">Jumlah Produk</div>
              <h1>98</h1>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="navigateTo(`ukmProduct`,`UKM`)">Lihat</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store/store.js";
export default {
  data() {
    return {};
  },
  created: () => {
    store.dispatch("setItem", "dashboard");
    store.dispatch("setSubItem", "dashboard");
  },
  methods:{
    navigateTo(route, item) {
      this.$router.push({name: route});
      this.$store.dispatch('setItem', item)
      this.$store.dispatch('setSubItem', route)
    }
  }
};
</script>

<style>
</style>