import React from 'react';
import SpammerInput from './spammer-input/spammer-input';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spam from '../spam/spam';
import { useSetNewSpam } from '../../hooks/useSetNewSpam';
import UserContext from '../../context/user-context';
import UserSettingsContext from '../../context/user-settings-context';

function Spammer(props) {
    const { newSpam, newTopic, savedSpam,
        handlePostSpam, handleTopicChange, handleSpamChange } = useSetNewSpam();
    return(
        <UserContext.Consumer>
            {(currentUserContext) =>
                (<UserSettingsContext.Consumer>
                {(currentSettingsContext) => 
                    (<Container style={{ backgroundColor: 
                        currentSettingsContext.userSettings.backgroundColor }}>
                        <Row>
                        <SpammerInput
                            handleSpammerTopicChange={(topic) => handleTopicChange({text: topic })}
                            handleSpammerTextChange={(text) => handleSpamChange({text: text})} 
                            />
                        </Row>
                        <Row>
                            <Col md={{ span: 3, offset: 4 }}>
                                <Button variant='success' 
                                    onClick={() => handlePostSpam(newTopic, newSpam, currentUserContext.id)}>Save
                                    </Button>
                            </Col>
                            <Col>
                            <Button variant='secondary' onClick={props.handleCancelSpammerSpam}>Cancel</Button>
                            </Col>
                        </Row>
                        
                        {
                            savedSpam &&
                                <Spam 
                                    key={savedSpam.id}
                                    spam={savedSpam}
                                    />
                        }
                        
                        
                    </Container>)
                }
                </UserSettingsContext.Consumer>)
            }
        </UserContext.Consumer>
    )
}

export default Spammer;