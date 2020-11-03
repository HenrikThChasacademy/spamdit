import { useEffect, useState, useCallback } from 'react';
import topicService from '../service/topicService';

export const useSetTopic = () => {
    const [topics, setTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    useEffect(() => {
        let fetchTopics = async() => {
            let topics = await topicService.getTopic();
            if (topics);
                setTopics(topics);
                setFilteredTopics(topics)
        }
        fetchTopics();
    }, []);

    const filterTopics = useCallback(async (text) => {
        const filteredTopics = topics.filter(topic => topic.text.includes(text))
        setFilteredTopics(filteredTopics);
    }, [topics]);

    return {
        topics,
        filteredTopics,
        filterTopics
    }
}