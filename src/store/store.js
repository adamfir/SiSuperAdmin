import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState()
    ],
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
        drawer: true,
        item: null,
        subItem: null,
        eventDialog: false,
    },
    mutations:{
        setToken (state, token){
            state.token = token
            if (token){
                state.isUserLoggedIn = true
            }
            else {
                state.isUserLoggedIn = false
            }
        },
        setUser (state, user){
            state.user = user
        },
        setDrawer (state, drawer){
            state.drawer = drawer
        },
        setItem (state, item){
            state.item = item
        },
        setSubItem (state, subItem){
            state.subItem = subItem
        },
        setEventDialog (state, eventDialog){
            state.eventDialog = eventDialog
        },
    },
    actions: {
        setToken ({commit}, token){
            commit('setToken', token)
        },
        setUser ({commit}, user){
            commit('setUser', user)
        },
        setDrawer ({commit}, drawer){
            commit('setDrawer', drawer)
        },
        setItem ({commit}, item){
            commit('setItem', item)
        },
        setSubItem ({commit}, subItem){
            commit('setSubItem', subItem)
        },
        setEventDialog ({commit}, eventDialog){
            commit('setEventDialog', eventDialog)
        },
    }
})