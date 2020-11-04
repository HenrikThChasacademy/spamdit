import React from 'react';
import Topic from '../topic/topic'
import { useSetTopic } from '../../hooks/useSetTopic';
import Container from 'react-bootstrap/Container';
import TopicFinder from './topic-finder/topic-finder';



function TopicList(props) {
    const { filteredTopics, filterTopics } = useSetTopic();

    return (
        <Container>
            <TopicFinder 
                handleTopicSearchChange={(text) => filterTopics(text)}/>
            <hr />
            {
            filteredTopics.length !== 0 &&
            filteredTopics.map(topic => 
                <Topic 
                    key={topic.id}
                    topic={topic} />)
            }
        </Container>
    )
}

export default TopicList;