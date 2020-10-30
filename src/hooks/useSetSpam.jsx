import { useState, useEffect, useCallback } from 'react';
import spamService from '../service/spamService';
import topicService from '../service/topicService';

export const useSetSpam = () => {
    const [spamList, setSpamList] = useState([]);

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

        return () => {};
    }, [])

    const handlePostSpam = useCallback(async () => {
        let savedTopic = await topicService.createTopic(this.state.newTopic);
        if (savedTopic) {
            let newSpam = this.createSpam(this.state.newSpam, savedTopic);
            let savedSpam = await spamService.createSpam(newSpam);
            if (savedSpam) {
                fetchSpam();
            }
        }
        return () => {};
    }, [fetchSpam])

    return {
        spamList,
        handlePostSpam
    }
}
