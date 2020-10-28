import { SPAMDIT_API_URL } from './pathVariables';

var axios = require('axios')

class topicService {

    TOPIC_PATH = SPAMDIT_API_URL +"/topic";

    createTopic = async (topic) => {
        try {
            let response = await axios.post(this.TOPIC_PATH, topic);
            return response.data;
        } catch {
            return false;
        }
    }

    getTopic = async () => {
        try {
            let response = await axios(this.TOPIC_PATH);
            return response.data;
        } catch {
            return false;
        }
    }

    getTopicById = async (id) => {
        try {
            let response = await axios(this.TOPIC_PATH +'/' +id);
            return response.data;
        } catch {
            return false;
        }
    }
}

export default new topicService();