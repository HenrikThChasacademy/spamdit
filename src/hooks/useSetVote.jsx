import { useEffect, useState, useCallback } from 'react';
import voteService from '../service/voteService';

export const useSetVote = (spamId, currentUserId) => {
    const [vote, setVote] = useState({id: null, isUpvote: false});

    useEffect(() => {
        let fetchVote = async() => {
            if (currentUserId) {
                const fetchedVote = await voteService.getVoteForSpamAndUser(spamId, currentUserId);
                if (fetchedVote) {
                    console.log(fetchedVote);
                    return setVote(fetchedVote);
                } else{
                    console.log("setting vote");
                    setVote({id: null, isUpvote: false});
                }
            }
            
        }
        fetchVote();
        return () => {};
    }, [currentUserId, spamId])

    const handleVoteClick = useCallback(async (isActive, isUpvote) => {
        const createVote = (isActive, isUpvote) => {
            return {id: vote.id,
                isUpvote: !isActive && isUpvote, 
                userId: currentUserId,
                spamId: spamId,
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
        return () => {}
    }, [currentUserId, spamId, vote.id])

    return {
        vote,
        handleVoteClick
    }
}