import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Vote(props) {

    return(
        <Row>
            <Col xs={{ span: 1, offset: 1 }}>
                <Button variant="outline-success" 
                    active={props.hasVoted && props.isUpvote}
                    onClick={(e) => props.handleVoteClick(props.isUpvote, true)}>+</Button>
                </Col>
            <Col xs={1}>
                <Button variant="outline-danger" 
                    active={props.hasVoted && !props.isUpvote}
                    onClick={(e) => props.handleVoteClick(!props.isUpvote, false)}>-</Button>
                </Col>
        </Row>
    )
}

export default Vote;