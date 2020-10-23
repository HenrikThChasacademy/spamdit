import React from 'react';
import Comment from './comment/comment';
import PostComment from './post-comment/post-comment'
import './spam.scss';

function Spam(props){
        return(

            <div className="spam-container">
                <div className="heading">
                    <h2>{props.spam.topic}</h2>
                </div>
                <div className="spam-text">
                    <p>{props.spam.text}</p>
                </div>
                <br />
                <div className="spam-info">
                    Spammed by {props.spam.user} at {props.spam.date}
                </div>
                <hr />
                {props.comments.map((comment) => {
                    return <Comment 
                        key={comment.date}
                        user={comment.user}
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
                    this.state.showPostComment &&
                    <PostComment 
                        handleTextChange={props.handleTextChange}
                        handlePostComment={props.handlePostComment}/>
                }
            </div>
        )
    
}

export default Spam;