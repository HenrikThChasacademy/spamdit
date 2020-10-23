import { SPAMDIT_API_URL } from './pathVariables';

var axios = require('axios')

class spamService {

    SPAM_PATH = SPAMDIT_API_URL +"/spam";
}

export default new spamService();