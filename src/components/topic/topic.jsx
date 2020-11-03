import React from 'react';
import Container from 'react-bootstrap/Container';

function Topic(props){
    
    return(
        <Container>
            
            <h2>{props.topic.text}</h2>

        </Container>
    )
}

export default Topic;