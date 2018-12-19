<template>
  <v-layout row>
    <v-flex>
      <div class="white elevation-2">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <h1>Buat Event</h1>
        </div>
        <div class="pl-4 pr-4 pt-4 pb-4">
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
              <v-date-picker ref="picker" v-model="date" min="1950-01-01"></v-date-picker>
            </v-menu>
            <v-text-field
              v-model="location"
              :rules="locationRules"
              label="Lokasi"
              required
              prepend-icon="location_city"
            ></v-text-field>
            <v-textarea icon="append-icon" solo auto-grow label="Deskripsi" v-model="description"></v-textarea>
            <v-text-field
              label="Pilih Gambar Event"
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
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <img :src="imageUrl" height="150" v-if="imageUrl">
            <div class="text-xs-center">
              <v-btn block color="light-blue darken-4" dark @click="createEvent">Buat Event</v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "@/store/store.js";
import EventService from "@/services/EventService";
export default {
  component: {
  },
  data: () => ({
    dialog: false,
    imageName: "",
    imageUrl: "",
    imageFile: "",
    valid: false,
    title: "",
    titleRules: [v => !!v || "Judul Event harus diisi"],
    organizer: "",
    organizerRules: [v => !!v || "Penyelenggara harus diisi"],
    date: "",
    dateRules: [v => !!v || "Tanggal harus diisi"],
    location: "",
    locationRules: [v => !!v || "Lokasi harus diisi"],
    description: ""
  }),
  methods: {
    async createEvent() {
      try {
        let formData = new FormData()
        formData.append('name', this.title)
        formData.append('organized_by', this.organizer)
        formData.append('date', this.date)
        formData.append('location', this.location)
        formData.append('description', this.description)
        formData.append('eventPicture', this.imageFile)
        // console.log(this.imageFile, this.title, this.organizer, this.date, this.location, this.description)
        await EventService.createEvent(formData).then(response => {
          console.log(response.data)
        })
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    fileChanged(file) {
      // handle file here. File will be an object.
      // If multiple prop is true, it will return an object array of files.
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
    }
  },
  created: () => {
    store.dispatch("setItem", "Event");
    store.dispatch("setSubItem", "eventCreate");
  }
};
</script>

<style>
</style>