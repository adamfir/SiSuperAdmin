import Api from '@/services/Api'
import store from '@/store/store'

export default {
    create(credential){
        return Api().post('invitations/', credential, {headers: {'Authorization': 'Bearer '+ store.state.token}})
    }
}
