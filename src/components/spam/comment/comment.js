import React from 'react';
import './_comment.sass';
import PostComment from '../post-comment/post-comment';

function Comment(props) {
    const { user, text, date, parent, comments } = props;

    return(
        <div className="comment-container">
            <b>{user}</b> replied to <b>{parent}</b> at {date}
            <p>{text}</p>
            <button className="reply-button" onClick={() => props.handleShowCommentPostComment}>
                Reply
            </button>
            {
                <PostComment 
                    handleTextChange={props.handleTextChange}
                    handlePostComment={props.handlePostComment}
                    />
            }
            <div className="comment-reply-container">
            <hr />
            {comments.map((comment) => {
                    return <Comment 
                    key={comment.date}
                    user={comment.user}
                    text={comment.text}
                    date={comment.date}
                    parent={user}
                    comments={comment.comments}
                        />
                })}
            </div>
        </div>
    )
    
}

export default Comment