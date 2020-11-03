import React from 'react';
import Comment from './comment/comment';
import PostComment from './post-comment/post-comment';
import './spam.scss';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Vote from './vote/vote';
import { useSetTopicName } from '../../hooks/useSetTopicName';
import { useSetUserName } from '../../hooks/useSetUserName';
import { useSetComments } from '../../hooks/useSetComments';
import { useSetNewComment } from '../../hooks/useSetNewComment';
import { useSetUser } from '../../hooks/useSetUser';

function Spam(props){
    const { topic } = useSetTopicName(props.spam.topicId);
    const { userName } = useSetUserName(props.spam.userId);
    const { comments, showPost, toggleShowPost, handlePostComment } = useSetComments(props.spam.id);
    const { newComment, handleSetNewComment } = useSetNewComment();
    const { currentUser } = useSetUser();

    return(
        <Container className="spam-container">
            <div className="heading">
                <h2>{topic}</h2>
            </div>
            <div className="spam-text">
                <p>{props.spam.text}</p>
            </div>
            <br />
            <div className="spam-info">
                Spammed by {userName} at {props.spam.dateCreated}
            </div>
            <Row md={2}>
                <Vote 
                    spamId={props.spam.id}
                    currentUserId={currentUser.id}
                    />
            </Row>
            {
                !showPost &&
                <Button variant='primary' className="comment-button" onClick={toggleShowPost}>
                    Comment
                </Button>
            }
            {
                showPost &&
                <PostComment 
                    handleTextChange={(text) => handleSetNewComment({text: text, parentId: props.spam.id})}
                    handlePostComment={() => handlePostComment(newComment, currentUser.id)}
                    handleCancelPostComment={toggleShowPost}
                    />
            }
            <hr />
            {
            comments.lenght !== 0 &&
            comments.map((comment) => {
                return <Comment 
                    key={comment.id}
                    comment={comment}
                    text={comment.text}
                    date={comment.date}
                    parentId={props.spam.id}
                    parentUserName={userName}
                    dateCreated={comment.dateCreated}
                    />
            })}

        </Container>
    )
    
}

export default Spam;