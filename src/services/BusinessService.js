import Api from '@/services/Api'
import store from '@/store/store'

export default {
    getBusiness() {
        return Api().get('business/getBusiness', {headers: {'Authorization': 'Bearer '+ store.state.token}})
    },
    getLogo(logo) {
        return Api().get('business/getBusiness/'+logo)
    },
    getUserBusiness(credential) {
        return Api().post('business/getBusinessByUserId', credential, {headers: {'Authorization': 'Bearer '+ store.state.token}})
    },
}
