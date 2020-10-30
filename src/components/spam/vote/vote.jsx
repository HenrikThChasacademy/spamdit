import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSetVote } from '../../../hooks/useSetVote';
import './vote.scss';

function Vote(props) {
    const { vote, handleVoteClick } = useSetVote(props.spamId, props.commentId, props.currentUserId);

    return(
        <Row>
            {vote &&
            <Fragment>
                <Col xs={{ span: 1, offset: 1 }}>
                    <Button variant="outline-success" size="sm" id="vote-btn-success"
                        active={vote.id && vote.isUpvote}
                        onClick={(e) => handleVoteClick(vote.isUpvote, true)}>+</Button>
                    </Col>
                <Col xs={1}>
                    <Button variant="outline-danger" size="sm" id="vote-btn-danger"
                        active={vote.id && !vote.isUpvote}
                        onClick={(e) => handleVoteClick(!vote.isUpvote, false)}>-</Button>
                </Col>
            </Fragment>
            }
        </Row>
    )
}

export default Vote;