import React from 'react';
import Container from 'react-bootstrap/Container';
import { useSetTopicSpam } from '../../hooks/useSetTopicSpam';
import Spam from '../spam/spam';
import UserContext from '../../context/user-context';
import UserSettingsContext from '../../context/user-settings-context';
import './topic.scss';

function Topic(props){
    const { topicSpam, handleSpamForTopicClick } = useSetTopicSpam();
    return(
        <UserContext.Consumer>
        {(currentUserContext) =>
        (
            <UserSettingsContext.Consumer>
            {(currentSettingsContext) => 
                (
                <Container style={{ backgroundColor: 
                    currentSettingsContext.userSettings.backgroundColor }}>
                    <Container className="topic-container" 
                        style={{ backgroundColor: currentSettingsContext.userSettings.backgroundColor }}
                        onClick={() => handleSpamForTopicClick(props.topic.id)}>
                        <h2 style={{ color: currentSettingsContext.userSettings.textColor }}>{props.topic.text}</h2>
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
            </UserSettingsContext.Consumer>
            )
        }
        </UserContext.Consumer>
    )
}

export default Topic;