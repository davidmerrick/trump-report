import Endpoints from '../constants/Endpoints'
import axios from 'axios'

class MoodUtils {

    static fetchMood(text){
        let payload = {
            text: text
        };
        return axios.post(Endpoints.TONE, payload).then(response => response.data);
    }
}

export default MoodUtils
