import React from 'react';
import Container from 'react-bootstrap/Container';
import { useSetTopicSpam } from '../../hooks/useSetTopicSpam';
import Spam from '../spam/spam';
import './topic.scss';

function Topic(props){
    const { topicSpam, handleSpamForTopicClick } = useSetTopicSpam();
    return(
        <Container>
            <Container className="topic-container" onClick={() => handleSpamForTopicClick(props.topic.id)}>
                <h2>{props.topic.text}</h2>
            </Container>
            {   
                topicSpam.lenght !== 0 &&
                topicSpam.map(spam => 
                    <Container key={spam.id} fluid>
                        <Spam 
                            key={spam.id}
                            spam={spam}/>
                    </Container>
                )
            }
        </Container>
    )
}

export default Topic;