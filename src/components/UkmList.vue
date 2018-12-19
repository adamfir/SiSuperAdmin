<template>
  <v-layout row>
    <v-flex>
      <div class="white elevation-2">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <h1>Daftar UKM</h1>
        </div>
        <div class="pl-4 pr-4 pt-4 pb-4">
          <v-card>
            <v-card-title>
              Daftar UKM
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
              :items="business"
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
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '@/store/store.js'
import BusinessService from '@/services/BusinessService.js'
import UkmDetail from '@/components/UkmDetail'
export default {
  data(){
    return {
      search: '',
      headers: [
        { text: "Nama UKM", value: "name" },
        { text: "Kategori", value: "category" },
        { text: "Email", value: "email" },
        { text: "Alamat", value: "address" },
        { text: "Telepon", value: "phone" },
        { text: "Detail", value: "detail" },
      ],
      business: []
    }
  },
  components:{
    UkmDetail
  },
  created(){
    store.dispatch('setItem', 'UKM')
    store.dispatch('setSubItem', 'ukmList')
  },
  async mounted() {
    try {
      BusinessService.getBusiness().then(res => {
        this.business = res.data.result;
        console.log(this.business)
      });
    } catch (error) {
      console.log(error)
    }
  }
};
</script>

<style>
</style>