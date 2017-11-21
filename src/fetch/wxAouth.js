import axios from 'axios'
import api from '@/fetch/api'
import qs from 'qs'

export default {

    wxAouth() {
    	return new Promise((resolve, reject) => {
    		axios.post('/api/auth')
            .then(response => {
            	if(response.status == 200) {
            		resolve(response.data) 
            	}
            })
            .catch((error) => {
               	reject(error)

            })
	    })
        
    }

}