import React from 'react';
import Topic from '../topic/topic'
import { useSetTopic } from '../../hooks/useSetTopic';
import Container from 'react-bootstrap/Container';

function TopicList(props) {
    const { topics } = useSetTopic();

    return (
        <Container>
            {
            topics.length !== 0 &&
            topics.map(topic => {
                return <Topic 
                    key={topic.id}
                    topic={topic} />

            })
            }
        </Container>
    )
}

export default TopicList;