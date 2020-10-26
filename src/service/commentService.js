import { SPAMDIT_API_URL } from './pathVariables';

var axios = require('axios')

class commentService {
    COMMENT_PATH = SPAMDIT_API_URL +"/comment";

    saveComment = async (spam) => {
        try {
            let response = await axios.post(this.COMMENT_PATH, spam);
            return response.data;
        } catch {
            return false;
        }
    }

    getCommentForParent = async () => {
        try {
            let response = await axios(this.COMMENT_PATH);
            return response.data;
        } catch {
            return false;
        }
    }

}

export default new commentService();