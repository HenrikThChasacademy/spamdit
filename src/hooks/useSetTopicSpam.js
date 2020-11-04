import { useState, useCallback } from 'react';
import spamService from '../service/spamService';

export const useSetTopicSpam = () => {
    const [topicSpam, setTopicSpam] = useState([]);
    const [topicId, setTopicId] = useState([false]);
    const fetchSpamForTopic = useCallback(async (id) => {
        if (!id) return setTopicSpam([]);
        const spam = await spamService.getSpamForTopic(id);
        if (spam) {
            setTopicSpam(spam);
        }
    }, [])

    const handleSpamForTopicClick = useCallback(async (clickedTopicId) => {
        const id = (topicId === clickedTopicId) ? 
            false : clickedTopicId;
        setTopicId(id)
        fetchSpamForTopic(id)
    }, [fetchSpamForTopic, topicId])

    return {
        topicSpam,
        handleSpamForTopicClick,
        fetchSpamForTopic
    }
}
