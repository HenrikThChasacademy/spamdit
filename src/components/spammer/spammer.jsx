import React from 'react';
import SpammerInput from './spammer-input/spammer-input';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useSetNewSpam } from '../../hooks/useSetNewSpam';

function Spammer(props) {
    const { newSpam, newTopic, handlePostSpam, handleTopicChange, handleSpamChange } = useSetNewSpam();
    return(
        <Container>
            <Row>
            <SpammerInput
                handleSpammerTopicChange={(topic) => handleTopicChange({text: topic })}
                handleSpammerTextChange={(text) => handleSpamChange({text: text})} 
                />
            </Row>
            <Row>
                <Col md={{ span: 3, offset: 4 }}>
                <Button variant='success' onClick={() => handlePostSpam(newTopic, newSpam, props.currentUserId)}>Save</Button>
                </Col>
                <Col>
                <Button variant='secondary' onClick={props.handleCancelSpammerSpam}>Cancel</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Spammer;