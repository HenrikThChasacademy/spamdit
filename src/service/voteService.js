import { SPAMDIT_API_URL } from './pathVariables';

var axios = require('axios')

class voteService {
    VOTE_PATH = SPAMDIT_API_URL +"/vote";

    saveVote = async (vote) => {
        try {
            let response = await axios.post(this.VOTE_PATH, vote);
            return response.data;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    updateVote = async (vote) => {
        try {
            let response = await axios.put(this.VOTE_PATH + "/" +vote.id, vote)
            return response.data;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    getVotesForSpam = async (spamId) => {
        try {
            let response = await axios(this.VOTE_PATH + "/spam/" +spamId);
            return response.data;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    getVotesForComment = async (commentId) => {
        try {
            let response = await axios(this.VOTE_PATH + "/comment/" +commentId);
            return response.data;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    getVoteForSpamAndUser = async (spamId, userId) => {
        try {
            let response = await axios(this.VOTE_PATH +"/spam/" +spamId +"/user/" +userId);
            return response.data;
        } catch(e) {
            console.log(e);   
            return false;
        }
    }

    getVoteForCommentAndUser = async (commentId, userId) => {
        try {
            let response = await axios(this.VOTE_PATH +"/comment/" +commentId +"/user/" +userId);
            return response.data;
        } catch(e) {
            console.log(e);   
            return false;
        }
    }

    deleteVote = async (id) => {
        try {
            await axios.delete(this.VOTE_PATH +"/" +id);
            return true;
        } catch(e) {
            return false;
        }
    }
}

export default new voteService();