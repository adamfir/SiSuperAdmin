<template>
  <v-layout row>
    <v-flex>
      <div class="white elevation-2">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <h1>Daftar Produk UKM</h1>
        </div>
        <div class="pl-4 pr-4 pt-4 pb-4">
          <v-card>
            <v-card-title>
              Daftar Produk
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
                <td class="text-xs-left">Rp {{ props.item.price }}</td>
                <td class="text-xs-left">{{ props.item.unit }}</td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "@/store/store.js";
import ProductService from "@/services/ProductService";
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: "Nama Produk", value: "name" },
        { text: "Harga", value: "price" },
        { text: "Satuan", value: "unit" }
      ],
      products: []
    };
  },
  created() {
    store.dispatch("setItem", "UKM")
    store.dispatch("setSubItem", "ukmProduct")
  },
  async mounted() {
    try {
      ProductService.getProducts().then(res => {
        this.products = res.data.result;
        console.log(this.products)
      });
    } catch (error) {
      this.error = error.response.data.error;
    }
  }
};
</script>

<style>
</style>