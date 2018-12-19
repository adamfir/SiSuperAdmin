import Api from '@/services/Api'

export default {
    register(credential) {
        return Api().post('users/signUp', credential)
    },
    login(credential) {
        return Api().post('users/signIn', credential)
    },
}
