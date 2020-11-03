import { useState, useCallback } from 'react';
import spamService from '../service/spamService';
import topicService from '../service/topicService';
import { useSetAnnonymousUser } from './useSetAnnonymousUser';

export const useSetNewSpam = () => {
    const [savedSpam, setSavedSpam] = useState(false);
    const [newTopic, setNewTopic] = useState({});
    const [newSpam, setNewSpam] = useState({});
    const { checkLoggedInAndSetDefaultUser } = useSetAnnonymousUser();

    const handleTopicChange = useCallback((topic) => {
        setNewTopic(topic);
    }, []);

    const handleSpamChange = useCallback((spam) => {
        setNewSpam(spam);
    }, []);

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
                setSavedSpam(savedSpam);
            }
        }
    }, [checkLoggedInAndSetDefaultUser])

    return {
        newTopic,
        newSpam,
        savedSpam,
        handlePostSpam,
        handleTopicChange,
        handleSpamChange
    }
}
