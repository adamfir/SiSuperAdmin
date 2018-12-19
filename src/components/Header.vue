<template>
    <v-toolbar app flat class="light-blue darken-4" dark>
        <v-toolbar-title v-if="!$store.state.isUserLoggedIn" class="mr-4">
            SiSuper Admin
        </v-toolbar-title>
        <v-toolbar-items v-if="$store.state.isUserLoggedIn">
            <!-- <v-btn  flat dark @click="setDrawer">
                <v-icon>menu</v-icon>
            </v-btn> -->
            <v-toolbar-side-icon @click="setDrawer"></v-toolbar-side-icon>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
            <v-btn @click="navigateTo({name: 'login'})"
                flat 
                dark
                >
                Login
            </v-btn>
        </v-toolbar-items>
        <!-- <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
            <v-btn @click="navigateTo({name: 'register'})"
                flat 
                dark
                >
                Register
            </v-btn>
        </v-toolbar-items> -->
        <v-toolbar-items v-if="$store.state.isUserLoggedIn">
            <v-btn @click="logout"
                flat 
                dark
                >
                Log out
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false
            }
        },
        methods:{
            navigateTo(route){
                this.$router.push(route)
            },
            logout (){
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setUser', null)
                this.$router.push({name:'login'})
            },
            setDrawer(){
                this.$store.dispatch('setDrawer', !this.$store.state.drawer)
            }
        }
    }
</script>

<style scoped>
    
</style>