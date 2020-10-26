import React from 'react';
import './comment.scss';
import PostComment from '../post-comment/post-comment';

function Comment(props) {
    return(
        <div className="comment-container">
            <b>{props.comment.user}</b> replied to <b>{props.parentUser}</b> at {props.comment.date}
            <p>{props.comment.text}</p>
            <button className="reply-button" onClick={() => props.handleShowCommentPostComment}>
                Reply
            </button>
            {
                <PostComment 
                    handleTextChange={(text) => props.handleTextChange({...props.comment, text: text, parentId: props.parentId})}
                    handlePostComment={props.handlePostComment}
                    />
            }
            <div className="comment-reply-container">
            <hr />
            {props.comments.map((comment) => {
                    return <Comment 
                    key={comment.date}
                    user={comment.user}
                    text={comment.text}
                    date={comment.date}
                    parent={props.parentId}
                    comments={comment.comments}
                        />
                })}
            </div>
        </div>
    )
    
}

export default Comment