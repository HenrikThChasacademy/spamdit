import { SPAMDIT_API_URL } from './pathVariables';

var axios = require('axios')

class commentService {
    COMMENT_PATH = SPAMDIT_API_URL +"/comment";

    saveComment = async (spam) => {
        try {
            let response = await axios.post(this.COMMENT_PATH, spam);
            return response.data;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    getCommentForParent = async (id) => {
        try {
            let response = await axios(this.COMMENT_PATH +'/parent/' +id);
            return response.data;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

}

export default new commentService();