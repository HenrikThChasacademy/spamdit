import React from 'react';
import Container from 'react-bootstrap/Container';
import Control from 'react-bootstrap/FormControl'
function TopicFinder(props) {
    return (
        <Container fluid>
            <Control type="text" placeholder="s/spam" value={props.topic} 
                onChange={(e) => props.handleTopicSearchChange(e.target.value)} /> 
        </Container>
    )
}

export default TopicFinder;