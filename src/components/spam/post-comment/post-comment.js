import React from 'react';
import './_post-comment.sass';

function PostComment(props) {

    return(
        <div>
            <div>
            <legend>Make a comment: </legend>
            <textarea className="comment-input" type="text"
                onChange={(e) => props.handleTextChange(e.target.value)} />
            </div>
            <button className="post-button" onClick={props.handlePostComment}>Post comment</button>
        </div>
    )
}

export default PostComment;