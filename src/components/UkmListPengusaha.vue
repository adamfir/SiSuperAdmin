<template>
  <v-layout row>
    <v-flex>
      <div class="white elevation-2">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <h1>Daftar Pengusaha UKM</h1>
        </div>
        <div class="pl-4 pr-4 pt-4 pb-4">
          <!-- <v-card> -->
            <v-card-title>
              Daftar Pengusaha
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
              :items="users"
              :search="search"
              :rows-per-page-items="[10,20,50,100]"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.username }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.phone }}</td>
                <td class="text-xs-left">{{ props.item.address }}</td>
                <td class="text-xs-left"><ukm-list-pengusaha-detail :userData="props.item"></ukm-list-pengusaha-detail></td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          <!-- </v-card> -->
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '@/store/store.js'
import UserService from '@/services/UserService.js'
import UkmListPengusahaDetail from '@/components/UkmListPengusahaDetail'
export default {
  components:{
    UkmListPengusahaDetail
  },
  data(){
    return{
      search: '',
      headers: [
        { text: "Nama Pengusaha", value: "username" },
        { text: "Email", value: "email" },
        { text: "Telepon", value: "phone" },
        { text: "Alamat", value: "address" },
        { text: "Detail" },
      ],
      users: []
    }
  },
  async created(){
    try{
      await UserService.getUsers().then(res => {
        this.users = res.data.result
        console.log(this.users)
      })
    }
    catch (err){
      console.log(err)
    }
    store.dispatch('setItem', 'UKM')
    store.dispatch('setSubItem', 'ukmListPengusaha')
  }
};
</script>

<style>
</style>