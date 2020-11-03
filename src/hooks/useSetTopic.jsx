import { useEffect, useState } from 'react';
import topicService from '../service/topicService';

export const useSetTopic = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        let fetchTopics = async() => {
            let topics = await topicService.getTopic();
            if (topics);
                setTopics(topics);
        }
        fetchTopics();
    }, [])

    return {
        topics
    }
}