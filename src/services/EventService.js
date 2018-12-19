import Api from '@/services/Api'
import store from '@/store/store'

export default {
    createEvent(credential) {
        return Api().post('events', credential, {
            headers: {
                'Authorization': 'Bearer '+ store.state.token,
                'Content-Type': `multipart/form-data; boundary=${credential._boundary}`
            }
        })
    },
    fetchEvent() {
        return Api().get('events', {headers: {'Authorization': 'Bearer '+ store.state.token}})
    },
    editEvent(eventId,credential) {
        return Api().patch('events/'+eventId, credential, {
            headers: {
                'Authorization': 'Bearer '+ store.state.token,
                'Content-Type': `multipart/form-data`
            }
        })
    }
}
