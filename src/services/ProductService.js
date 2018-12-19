import Api from '@/services/Api'
import store from '@/store/store'

export default {
    getProducts() {
        return Api().get('products')
    },
    getProductsByBusinessId(credential) {
        return Api().post('products/getProductByBussinessId',credential,{headers: {'Authorization': 'Bearer '+ store.state.token}})
    }
}
