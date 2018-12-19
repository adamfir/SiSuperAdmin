import Api from '@/services/Api'
import store from '@/store/store'

export default {
    create(credential) {
        return Api().post('attendances', credential, {
            headers: {
                'Authorization': 'Bearer '+ store.state.token,
            }
        })
    },
    // fetchEvent() {
    //     return Api().get('events', {headers: {'Authorization': 'Bearer '+ store.state.token}})
    // },
    // editEvent(eventId,credential) {
    //     return Api().patch('events/'+eventId, credential, {
    //         headers: {
    //             'Authorization': 'Bearer '+ store.state.token,
    //             'Content-Type': `multipart/form-data`
    //         }
    //     })
    // }
}
