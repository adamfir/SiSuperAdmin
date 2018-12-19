import Api from '@/services/Api'
import store from '@/store/store'

export default {
    getUsers() {
        return Api().get('users/userList', {headers: {'Authorization': 'Bearer '+ store.state.token}})
    },
    getUserById(id) {
        return Api().get('users/getUserById/'+id, {headers: {'Authorization': 'Bearer '+ store.state.token}})
    },
    suspend(id) {
        return Api().get('users/suspendUser/'+id, {headers: {'Authorization': 'Bearer '+ store.state.token}})
    },
    unsuspend(id) {
        return Api().get('users/unsuspendUser/'+id, {headers: {'Authorization': 'Bearer '+ store.state.token}})
    },
}
