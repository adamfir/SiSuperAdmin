<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn block slot="activator" color="light-blue darken-4" dark>Detail</v-btn>
    <v-card>
      <v-toolbar dark color="light-blue darken-4" flat>
        <v-btn icon dark @click.native="dialog = !dialog">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{eventData.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
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
        <v-tab-item :key="items[0]" centered>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs2>
                <v-img :src="`http://sisuper.codepanda.id/events/eventPicture/${eventPicture}`" >
                </v-img>
              </v-flex>
              <v-flex xs10>
                <v-card>
                  <v-card-text class="px-0">
                    <v-list two-line subheader>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Nama Event</v-list-tile-title>
                          <v-list-tile-sub-title>{{eventData.name}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Penyelenggara</v-list-tile-title>
                          <v-list-tile-sub-title>{{eventData.organized_by}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Waktu Pelaksanaan</v-list-tile-title>
                          <v-list-tile-sub-title>{{eventData.date}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Lokasi</v-list-tile-title>
                          <v-list-tile-sub-title>{{eventData.location}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Deskripsi</v-list-tile-title>
                          <v-list-tile-action-text v-html="eventData.description"></v-list-tile-action-text>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
        <v-tab-item :key="items[1]" centered>
          <v-container grid-list-md text-xs-left fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-title>Daftar Pengusaha
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
                      <!-- <td class="text-xs-left">{{ getUsaha(props.item._id) }}</td> -->
                      <td class="text-xs-left">{{ props.item.email }}</td>
                      <td class="text-xs-left">{{ props.item.address }}</td>
                      <td class="text-xs-left"><v-btn color="light-blue darken-4" dark block @click="createInvitation(props.item._id)">Undang</v-btn></td>
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
        <v-tab-item :key="items[2]" centered>
          <v-container grid-list-md text-xs-left fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-text class="pl-4 pr-4 pt-4 pb-4">
                    <v-form v-model="valid">
                      <v-text-field
                        v-model="title"
                        :rules="titleRules"
                        label="Judul Event"
                        required
                        prepend-icon="title"
                      ></v-text-field>
                      <v-text-field
                        v-model="organizer"
                        :rules="organizerRules"
                        label="Penyelenggara"
                        required
                        prepend-icon="domain"
                      ></v-text-field>
                      <v-menu
                        :close-on-content-click="true"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="date"
                          label="Waktu Pelaksanaan"
                          prepend-icon="event"
                          readonly
                          required
                        ></v-text-field>
                        <v-date-picker
                          ref="picker"
                          v-model="date"
                          min="1950-01-01"
                        ></v-date-picker>
                      </v-menu>
                      <v-text-field
                        v-model="location"
                        :rules="locationRules"
                        label="Lokasi"
                        required
                        prepend-icon="location_city"
                      ></v-text-field>
                      <v-textarea
                        icon="append-icon"
                        solo
                        auto-grow
                        label="Deskripsi"
                        v-model="description"
                      ></v-textarea>
                      <v-text-field
                        label="Select Image"
                        @click="pickFile"
                        v-model="imageName"
                        prepend-icon="attach_file"
                      ></v-text-field>
                      <input
                        type="file"
                        style="display: none"
                        ref="image"
                        accept="image/*"
                        @change="onFilePicked"
                      >
                      <v-dialog v-model="imageDialog" max-width="290">
                        <v-card>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat="flat" @click.native="imageDialog = false">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <img :src="imageUrl" height="150" v-if="imageUrl">
                      <div class="text-xs-center">
                        <v-btn 
                          block 
                          color="light-blue darken-4"
                          dark
                          @click="editEvent"
                          >
                          Edit Event
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
        <v-tab-item :key="items[3]" centered>
          <v-container grid-list-md text-xs-left fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-title>Daftar Pengusaha
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search_inv"
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="headers_inv"
                    :items="usersAttendance"
                    :search="search_inv"
                    :rows-per-page-items="[10,20,50,100]"
                    item-key="id"
                  >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-left">{{ props.item.username }}</td>
                      <td class="text-xs-left">{{ props.item.email }}</td>
                      <td class="text-xs-left">{{ props.item.address }}</td>
                      <td class="text-xs-left"><v-btn color="light-blue darken-4" dark block @click="createAttendences(props.item._id, props.item.id)">Hadir</v-btn></td>
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
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import store from "@/store/store.js"
import EventService from '@/services/EventService'
import UserService from '@/services/UserService'
import BusinessService from '@/services/BusinessService'
import InvitationService from '@/services/InvitationService'
import AttendanceService from '@/services/AttendanceService'
export default {
  props: ["eventData"],
  data() {
    return {
      imageName: "",
      imageUrl: "",
      imageFile: "",
      items: [
        'Detail', 'Undangan', 'Edit', 'Kehadiran',
      ],
      search: '',
      search_inv: '',
      headers: [
        { text: "Nama", value: "name" },
        // { text: "Daftar Usaha", value: "business" },
        { text: "Email", value: "email" },
        { text: "Alamat", value: "address" },
        { text: "Undang", value: "undang" },
        ],
      headers_inv: [
        { text: "Nama", value: "name" },
        { text: "Email", value: "email" },
        { text: "Alamat", value: "address" },
        { text: "Hadir", value: "hadir" },
        ],
      users: [],
      usersAttendance: [],
      eventPicture: this.eventData.picture.replace(" ", "%20").replace(".jpg", ""),
      dialog: false,
      imageDialog: false,
      tab: null,
      valid: false,
      title: this.eventData.name,
      titleRules: [v => !!v || "Judul Event harus diisi"],
      organizer: this.eventData.organized_by,
      organizerRules: [v => !!v || "Penyelenggara harus diisi"],
      location: this.eventData.location,
      locationRules: [v => !!v || "Lokasi harus diisi"],
      description: this.eventData.description,
      date: new Date(Date.parse(this.eventData.date)).toISOString().split("T")[0],
      dateRules: [v => !!v || "Tanggal harus diisi"],
      // temp: null,
      // result: ''
    };
  },
  methods: {
    setDialog() {
      store.dispatch("setEventDialog", false);
    },
    async editEvent(){
      try{
        const response = await EventService.editEvent(this.eventData._id,{
          name: this.eventData.title,
          organized_by: this.eventData.organizer,
          date: this.eventData.date,
          location: this.eventData.location,
          description: this.eventData.description,
        })
        console.log(response.data)
      }
      catch(error){
        this.error = error.response
      }
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    createInvitation(id){
      try{
        InvitationService.create({
          eventId : this.eventData._id,
          userId : id
        }).then(res => {
          console.log(res.data.createdInvitation, id, this.eventData._id)
          this.users = this.users.filter((el) => { return el._id != id})
        })
      }
      catch(err){
        consol.log(err.response.data.error)
      }
    },
    async editEvent(){
      try {
        let formData = new FormData()
        formData.append('name', this.title)
        formData.append('organized_by', this.organizer)
        formData.append('date', this.date)
        formData.append('location', this.location)
        formData.append('description', this.description)
        formData.append('eventPicture', this.imageFile)
        console.log(this.title, this.organizer, this.date, this.location, this.description, this.imageFile)
        await EventService.editEvent(this.eventData._id,formData).then(res =>{
          this.eventData = res.data
        })
      }catch(err){
        console.log("err.response.data.error")
        console.log(err)
      }
    },
    createAttendences(_id, id){
      console.log(this.eventData._id, _id, id)
      try {
        AttendanceService.create({
          'eventId' : this.eventData._id,
          'userId': _id,
          'response': 1
        }).then(res => {
          this.usersAttendance = this.usersAttendance.filter((el) => { return el._id != _id})
          console.log("res.data :")
          console.log(res.data)
        })
      }catch(err){
        console.log("err.response :")
        console.log(err)
      }
    }
  },
  async created(){
    try{
      await UserService.getUsers().then(res => {
        this.users = res.data.result
        this.usersAttendance = res.data.result
      })
    }catch(error){
      console.log(error)
    }
    try{
      if(this.eventPicture){
        this.imageUrl = "http://sisuper.codepanda.id/events/eventPicture/" + this.eventPicture
      }
    }catch(err){
      console.log(err)
    }
  },
  computed: {
    // indexedItems (items = []) {
    //   return items.map((item, index) => ({
    //     id: index,
    //     ...item
    //   }))
    // }
  }
};
</script>