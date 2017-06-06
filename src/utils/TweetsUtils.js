import Endpoints from '../constants/Endpoints'

class DataUtils {

    static fetchData(){
        return fetch(Endpoints.DATA).then(response => response.json());
    }
}

export default DataUtils