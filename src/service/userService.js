import { SPAMDIT_API_URL } from './pathVariables';

var axios = require('axios');

class userService {

    SPAM_PATH = SPAMDIT_API_URL +"/user";

    createUser = async (user) => {
        try {
            let response = await axios.post(this.SPAM_PATH, user);
            return response.data;
        } catch(e) {
            console.log(e)
            return false;
        }
    }

    saveUser = async (user) => {
        try {
            let response = await axios.put(this.SPAM_PATH +'/' +user.id, user);
            return response.data;
        } catch(e) {
            console.log(e)
            return false;
        }
    }

    getUserById = async (id) => {
        try {
            let response = await axios(this.SPAM_PATH +'/' +id);
            return response.data;
        } catch(e) {
            console.log(e)
            return false;
        }
    }
}

export default new userService();