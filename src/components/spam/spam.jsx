import React from 'react';
import Comment from './comment/comment';
import PostComment from './post-comment/post-comment';
import './spam.scss';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Vote from './vote/vote';
import { useSetTopic } from '../../hooks/useSetTopic';
import { useSetUserName } from '../../hooks/useSetUserName';
import { useSetComments } from '../../hooks/useSetComments';


function Spam(props){
    const { topic } = useSetTopic(props.spam.topicId);
    const { userName } = useSetUserName(props.spam.userId);
    const { comments, showPost, toggleShowPost, handlePostComment } = useSetComments(props.spam.id);

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
            {
                props.currentUserId &&
                <Vote 
                    spamId={props.spam.id}
                    currentUserId={props.currentUserId}
                    />
            }
            {
                !showPost &&
                <Button variant='primary' className="comment-button" onClick={toggleShowPost}>
                    Comment
                </Button>
            }
            {
                showPost &&
                <PostComment 
                    handleTextChange={(text) => props.handleTextChange({...props.newComment, 
                        text: text, parentId: props.spam.id})}
                    handlePostComment={() => handlePostComment(props.handlePostComment)}
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
                    parentUserId={props.userId}
                    parentUserName={userName}
                    currentUserId={props.currentUserId}
                    dateCreated={comment.dateCreated}
                    comments={comment.comments}
                    handleTextChange={props.handleTextChange}
                    handlePostComment={props.handlePostComment}
                    />
            })}


        </Container>
    )
    
}

export default Spam;