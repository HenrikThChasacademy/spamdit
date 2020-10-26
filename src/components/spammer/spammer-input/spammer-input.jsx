import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './spammer-input.scss';

function SpammerInput(props) {
    const { topic, text, handleSpammerTopicChange, handleSpammerTextChange } = props

    return(
        <Container>
            <Row>
                <label className="input-label">Enter a topic</label>
            </Row>
            <Row>
                <input className="spammer-topic-input" type="text" placeholder="s/spam" value={topic} 
                onChange={(e) => handleSpammerTopicChange(e.target.value)} /> 
            </Row>
            <Row>
                <label className="input-label">Spam away</label>
            </Row>
            <Row>
                <textarea className="spammer-text-input" type="text" placeholder="Spam spam spam..." value={text} 
                onChange={(e) => handleSpammerTextChange(e.target.value)} /> 
            </Row>
        </Container>
    )
}

export default SpammerInput;