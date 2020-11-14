import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSetVote } from '../../../hooks/useSetVote';
import './vote.scss';

function Vote(props) {
    const { vote, upvotes, downvotes, handleVoteClick } = useSetVote(props.spamId, props.commentId, props.currentUserId);

    return(
        <Row>
            <Fragment>
                <Col xs={{ span: 6, offset: 1 }} md={{ span: 5, offset: 1 }}>
                    {(vote && props.currentUserId) &&
                        <Button variant="outline-success" size="sm" id="vote-btn-success"
                            active={vote.id && vote.isUpvote}
                            onClick={(e) => handleVoteClick(vote.isUpvote, true)}>+</Button>
                    }
                    <p>Upvotes: +{upvotes}</p>
                </Col>
                <Col xs={{ spam: 6, offset: 1}} md={5}>
                    {(vote && props.currentUserId) &&
                        <Button variant="outline-danger" size="sm" id="vote-btn-danger"
                            active={vote.id && !vote.isUpvote}
                            onClick={(e) => handleVoteClick(!vote.isUpvote, false)}>-</Button>
                    }
                    <p>Downvotes: -{downvotes}</p>
                </Col>
            </Fragment>
        </Row>
    )
}

export default Vote;