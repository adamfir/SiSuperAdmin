<template>
  <v-layout row>
    <v-flex>
      <div class="white elevation-2">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <h1>Daftar Event</h1>
        </div>
        <div class="pl-4 pr-4 pt-4 pb-4">
          <v-card-title>Daftar Event
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="event" :search="search" 
            :rows-per-page-items="[10,20,50,100]" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.organized_by }}</td>
              <td
                class="text-xs-left"
              >{{ new Date(Date.parse(props.item.date)).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</td>
              <td class="text-xs-left">{{ props.item.location }}</td>
              <!-- <td class="text-xs-right"><v-btn block dark color="light-blue darken-4">Detail</v-btn></td> -->
              <td class="text-xs-right">
                <event-detail :eventData="props.item"></event-detail>
              </td>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert>
          </v-data-table>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import EventDetail from "@/components/EventDetail";
import EventService from "@/services/EventService";
import store from "@/store/store.js";
export default {
  data() {
    return {
      headers: [
        { text: "JUDUL EVENT", value: "name" },
        { text: "PENYELENGGARA", value: "organized_by" },
        { text: "WAKTU PELAKSANAAN", value: "date" },
        { text: "LOKASI", value: "location" },
        { text: "DETAIL", value: "protein", align: "center" }
      ],
      event: [],
      search: ""
    };
  },
  components: {
    EventDetail
  },
  methods: {},
  created() {
    store.dispatch("setItem", "Event");
    store.dispatch("setSubItem", "eventList");
  },
  async mounted() {
    try {
      EventService.fetchEvent().then(res => {
        this.count = res.data.count;
        this.event = res.data.event;
        console.log(this.event);
      });
    } catch (error) {
      this.error = error.response.data.error;
    }
  }
};
</script>

<style>
</style>