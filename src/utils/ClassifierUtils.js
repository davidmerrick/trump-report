import Endpoints from "../constants/Endpoints";

class ClassifierUtils {

    static getClassifiedTweet(category, sentimentLabel){
        return fetch(`${Endpoints.CLASSIFIER}?category=${category}&sentimentLabel=${sentimentLabel}`)
            .then(response => response.json())
    }
}

export default ClassifierUtils