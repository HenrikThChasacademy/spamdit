import { SPAMDIT_API_URL } from './pathVariables';

var axios = require('axios')

class spamService {

    SPAM_PATH = SPAMDIT_API_URL +"/spam";

    createSpam = async (spam) => {
        try {
            let response = await axios.post(this.SPAM_PATH, spam);
            return response.data;
        } catch {
            return false;
        }
    }

    getSpam = async () => {
        try {
            let response = await axios(this.SPAM_PATH);
            return response.data;
        } catch {
            return false;
        }
    }

    getSpamForTopic = async (topicId) => {
        try {
            let response = await axios(this.SPAM_PATH+ "/topic/" +topicId);
            return response.data;
        } catch {
            return false;
        }
    }

    getSpamForUser = async (userId) => {
        try {
            let response = await axios(this.SPAM_PATH+ "/user/" +userId);
            return response.data;
        } catch {
            return false;
        }
    }
}

export default new spamService();