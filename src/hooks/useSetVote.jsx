import { useEffect, useState, useCallback } from 'react';
import voteService from '../service/voteService';

export const useSetVote = (spamId, commentId, currentUserId) => {
    const [vote, setVote] = useState({id: null, isActive: false});
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);

    const fetchVotes = useCallback(async() => {
        const votes = 
            spamId ?
                await voteService.getVotesForSpam(spamId)
                :
                await voteService.getVotesForComment(commentId);
        if (votes) {
            const upvotes = votes.filter(vote => vote.isUpvote === true);
            const nrOfdownvotes = votes.length - upvotes.length;
            setUpvotes(upvotes.length);
            setDownvotes(nrOfdownvotes);
        }
    }, [commentId, spamId])

    useEffect(() => {
        let fetchVote = async() => {
            if (currentUserId) {
                const fetchedVote = 
                    spamId ? 
                        await voteService.getVoteForSpamAndUser(spamId, currentUserId) 
                        :
                        await voteService.getVoteForCommentAndUser(commentId, currentUserId);
                if (fetchedVote) {
                    return setVote(fetchedVote);
                } else{
                    setVote({id: null, isActive: false});
                }
            }   
        }

        fetchVote();
        fetchVotes();
    }, [commentId, currentUserId, fetchVotes, spamId])

    const handleVoteClick = useCallback(async (isActive, isUpvote) => {
        const createVote = (isActive, isUpvote) => {
            return {id: vote.id,
                isUpvote: !isActive && isUpvote, 
                userId: currentUserId,
                spamId: spamId,
                commentId: commentId,
                votedDate: new Date()}
        }

        let newVote = {id: null, isActive: false};
        const isNewVote = vote.id === null;
        const shouldDelete = !isNewVote && ((isActive && isUpvote) || (isActive && !isUpvote));
        const shouldSaveNew = isNewVote;
        const shouldUpdateExisting = vote.id !== null;
        if (shouldDelete) {
            await voteService.deleteVote(vote.id);
        }
        else if (shouldSaveNew) {
            newVote = await voteService.saveVote(createVote(isActive, isUpvote));
        } else if (shouldUpdateExisting) {
            newVote = await voteService.updateVote(createVote(isActive, isUpvote));
        }
        setVote(newVote);
        fetchVotes();
    }, [vote.id, fetchVotes, currentUserId, spamId, commentId])

    return {
        vote,
        upvotes,
        downvotes,
        handleVoteClick
    }
}