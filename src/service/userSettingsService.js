import { SPAMDIT_API_URL } from './pathVariables';


var axios = require('axios');

class userSettingsService {

    SPAM_PATH = SPAMDIT_API_URL +"/userSettings";

    saveUserSettings = async (userSettings) => {
        try {
            let response = await axios.post(this.SPAM_PATH, userSettings);
            return response.data;
        } catch(e) {
            console.log(e)
            return false;
        }
    }

    getUserSettingsById = async (id) => {
        try {
            let response = await axios(this.SPAM_PATH +'/' +id);
            return response.data;
        } catch(e) {
            console.log(e)
            return false;
        }
    }
}

export default new userSettingsService();