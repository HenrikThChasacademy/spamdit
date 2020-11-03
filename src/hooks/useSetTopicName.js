import { useEffect, useState} from 'react';
import topicService from '../service/topicService';

export const useSetTopicName = (topicId) => {
    const [topic, setTopic] = useState(null);
    useEffect(() => {
        let fetchTopicText = async() => {
            const topic = await topicService.getTopicById(topicId);
            setTopic(topic.text);
        };
        fetchTopicText();
    }, [topicId])

    return {
        topic
    }
}