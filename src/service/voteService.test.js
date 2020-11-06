import axios from 'axios';
import voteService from './voteService';

jest.mock('axios');

describe('Vote service test', () => {

    test('Save vote sould return vote on success', async () => {
        const vote = {id: 1, isUpvote: true};


        axios.post.mockImplementationOnce(() => (
            Promise.resolve({ data: vote})
        ))
        
        const savedVote = await voteService.saveVote(vote);

        expect(savedVote.id).toBe(1)
        expect(savedVote.isUpvote).toBeTruthy();
    })

    test('Get vote for spam and user should return a vote', async () => {
        const vote = {id: 1, isUpvote: false};


        axios.mockImplementationOnce(() => (
            Promise.resolve({ data: vote})
        ))
        
        const savedVote = await voteService.getVoteForSpamAndUser(1, 1);

        expect(savedVote.id).toBe(1)
        expect(savedVote.isUpvote).toBeFalsy();
    })
})