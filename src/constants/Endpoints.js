const API_HOST = "https://t35q76g94l.execute-api.us-east-1.amazonaws.com/prod";

const Endpoints = {
    TWEETS: `${API_HOST}/tweets`,
    NEWS: `${API_HOST}/news`,
    TONE: `${API_HOST}/tone`,
    CLASSIFIER: `${API_HOST}/classified-tweet`
};

export default Endpoints

