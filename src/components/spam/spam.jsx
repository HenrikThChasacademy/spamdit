import React from 'react';
import Comment from './comment/comment';
import PostComment from './post-comment/post-comment'
import './spam.scss';
import Container from 'react-bootstrap/Container'

function Spam(props){
        return(

            <Container className="spam-container">
                <div className="heading">
                    <h2>{props.spam.topicId}</h2>
                </div>
                <div className="spam-text">
                    <p>{props.spam.text}</p>
                </div>
                <br />
                <div className="spam-info">
                    Spammed by {props.spam.userId} at {props.spam.date}
                </div>
                <hr />
                {
                props.comments &&
                props.comments.map((comment) => {
                    return <Comment 
                        key={comment.date}
                        userId={comment.userId}
                        text={comment.text}
                        date={comment.date}
                        parent={props.spam.user}
                        comments={comment.comments}
                        />
                })}
                <button className="comment-button" onClick={props.handleShowPostComment}>
                    Comment
                </button>
                {
                    props.showPostComment &&
                    <PostComment 
                        handleTextChange={props.handleTextChange}
                        handlePostComment={props.handlePostComment}/>
                }
            </Container>
        )
    
}

export default Spam;