import { useState, useEffect, useCallback } from 'react';
import spamService from '../service/spamService';
import topicService from '../service/topicService';
import { useSetAnnonymousUser } from './useSetAnnonymousUser';

export const useSetSpam = () => {
    const [spamList, setSpamList] = useState([]);
    const { checkLoggedInAndSetDefaultUser } = useSetAnnonymousUser();
    const fetchSpam = useCallback(async () => {
        const spam = await spamService.getSpam();
        if (spam) {
            setSpamList(spam);
        }
    },[])

    useEffect(() => {
        let fetchSpam = async() => {
            const spam = await spamService.getSpam();
            setSpamList(spam);
        };
        fetchSpam();
    }, [])

    const handlePostSpam = useCallback(async (topic, spam, currentUserId) => {
        const userId = await checkLoggedInAndSetDefaultUser(currentUserId);
        if (!userId) return;
        let savedTopic = await topicService.createTopic(topic);
        if (savedTopic) {
            let newSpam = { ...spam, 
                userId: userId,
                topicId: savedTopic.id,
                dateCreated: new Date()
                };
            let savedSpam = await spamService.createSpam(newSpam);
            if (savedSpam) {
                fetchSpam();
            }
        }
    }, [checkLoggedInAndSetDefaultUser, fetchSpam])

    return {
        spamList,
        handlePostSpam
    }
}
