<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="light-blue darken-4" dark>
          <v-toolbar-title>
            Login
          </v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="email"
              label="Email"
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
                @click="login"
                >
                Login
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
  name: "Login",
  data() {
    return {
      show: false,
      email: 'adamfir@gmail.com',
      password: '123qwe'
    };
  },
  methods:{
    async login(){
      try{
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        })
        console.log(response.data)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.result)
        this.$router.push({
          name: 'dashboard'
        })
      }
      catch(error){
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