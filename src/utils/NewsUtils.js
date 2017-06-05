import Endpoints from '../constants/Endpoints'

class NewsUtils {

    static fetchNews(){
        return fetch(Endpoints.NEWS).then(response => response.json());
    }
}

export default NewsUtils
