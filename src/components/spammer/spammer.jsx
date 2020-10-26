import React from 'react';
import SpammerInput from './spammer-input/spammer-input';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Spammer(props) {
    return(
        <Container fluid>
            <Row>
            <SpammerInput
                handleSpammerTopicChange={(topic) => props.handleSpammerTopicChange({...props.newTopic, text: topic })}
                handleSpammerTextChange={(text) => props.handleSpammerChange({...props.newSpam, text: text})} 
                />
            </Row>
            <Row>
                <Col>
                <Button onClick={props.handleSaveSpammerSpam}>Save</Button>
                </Col>
                <Col>
                <Button onClick={props.handleCancelSpammerSpam}>Cancel</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Spammer;