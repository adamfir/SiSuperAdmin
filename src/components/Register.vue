<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="light-blue darken-4" dark>
          <v-toolbar-title>
            Register
          </v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="username"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="phone"
              label="Phone"
            ></v-text-field>
            <v-text-field
              v-model="address"
              label="Address"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              :append-icon="show ? 'visibility_off' : 'visibility'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              hint="At least 6 characters"
            ></v-text-field>
            <div class="text-xs-center">
              <v-btn 
                block 
                color="light-blue darken-4"
                dark
                @click="register"
                >
                Register
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>

    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: "Register",
  data() {
    return {
      show: false,
      username: 'adamfir',
      phone: '089643730412',
      address: 'Taman Dramaga Permai 2',
      email: 'adamfir@gmail.com',
      password: '123qwe'
    };
  },
  methods:{
    async register(){
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          username: this.username,
          address: this.address,
          phone: this.phone,
        })
      }
      catch (error){
        this.error = error.response.data.error
      }
    }
  },
  watch: {
    
  }
};
</script>

<style>
  
</style>