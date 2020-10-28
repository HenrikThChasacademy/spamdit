import React, { useState, useEffect, useCallback } from 'react';
import './comment.scss';
import Button from 'react-bootstrap/Button';
import PostComment from '../post-comment/post-comment';
import userService from '../../../service/userService';
import commentService from '../../../service/commentService';
import Container from 'react-bootstrap/Container';

function Comment(props) {
    const [commentUserName, setSpamUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [showPost, setShowPost] = useState(false);
    
    useEffect(() => {
        let fetchUserName = async() => {
            const commentUser = await userService.getUserById(props.comment.userId);
            setSpamUser(commentUser.name);
        }

        let fetchComments = async() => {
            const comments = await commentService.getCommentForParent(props.comment.id);
            setComments(comments);
        }
        fetchUserName();
        fetchComments();
    }, [props.comment.id, props.comment.userId, setSpamUser, setComments]);

    const toggleShowPost = useCallback(async () => {
        setShowPost(!showPost);
    }, [showPost]) 
    
    const handlePostCommentReply = useCallback(async () => {
        const newComment = await props.handlePostComment();
        console.log(comments);
        console.log(newComment);
        let newComments = [...comments, newComment];
        console.log(newComments);
        setComments(newComments);
        toggleShowPost();
    }, [comments, props, toggleShowPost])

    return(
        <Container fluid className="comment-container">
            <b>{commentUserName}</b> replied to <b>{props.parentUserName}</b> at {props.comment.dateCreated}
            <p>{props.comment.text}</p>
            {
                !showPost &&
                <Button className="reply-button" onClick={toggleShowPost}>
                    Reply
                </Button>
            }
            {
                showPost &&
                <PostComment 
                    handleTextChange={(text) => props.handleTextChange({...props.newComment, 
                        text: text, parentId: props.comment.id})}
                    handlePostComment={handlePostCommentReply}
                    handleCancelPostComment={toggleShowPost}
                    />
            }
            <div className="comment-reply-container">
            <hr />
            {
            comments.length !== 0 &&
            comments.map((comment) => {
                    return <Comment 
                        key={comment.id}
                        comment={comment}
                        text={comment.text}
                        date={comment.date}
                        parentId={props.comment.Id}
                        parentUserId={props.userId}
                        parentUserName={commentUserName}
                        dateCreated={comment.dateCreated}
                        comments={comment.comments}
                        handleTextChange={props.handleTextChange}
                        handlePostComment={props.handlePostComment}
                        />
                })}
            </div>
        </Container>
    )
    
}

export default Comment