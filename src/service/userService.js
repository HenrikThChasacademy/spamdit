import { SPAMDIT_API_URL } from './pathVariables';

var axios = require('axios');

class userService {

    SPAM_PATH = SPAMDIT_API_URL +"/user";

    createUser = async (user) => {
        try {
            let response = await axios.post(this.SPAM_PATH, user);
            return response.data;
        } catch {
            return false;
        }
    }
}

export default new userService();