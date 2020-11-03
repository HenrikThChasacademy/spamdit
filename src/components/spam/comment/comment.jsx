import React from 'react';
import './comment.scss';
import Button from 'react-bootstrap/Button';
import PostComment from '../post-comment/post-comment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Vote from '../vote/vote';
import { useSetUserName } from '../../../hooks/useSetUserName';
import { useSetComments } from '../../../hooks/useSetComments';
import { useSetNewComment } from '../../../hooks/useSetNewComment';
import UserContext from '../../../context/user-context';

function Comment(props) {
    const { userName } = useSetUserName(props.comment.userId);
    const { comments, showPost, toggleShowPost, handlePostComment } = 
        useSetComments(props.comment.id);
    const { newComment, handleSetNewComment } = useSetNewComment();

    return(
        <Container fluid className="comment-container">
            <b>{userName}</b> replied to <b>{props.parentUserName}</b> at {props.comment.dateCreated}
            <p>{props.comment.text}</p>
            <Row md={2}>
                <UserContext.Consumer>
                    {(currentUserContext) =>
                        <Vote 
                            commentId={props.comment.id}
                            currentUserId={currentUserContext.id}
                            />
                    }
                </UserContext.Consumer>
            </Row>
            {
                !showPost &&
                <Button className="reply-button" size="sm" onClick={toggleShowPost}>
                    Reply
                </Button>
            }
            {
                showPost &&
                <UserContext.Consumer>
                    {(currentUserContext) => {
                        <PostComment 
                            handleTextChange={(text) => handleSetNewComment({ text: text, parentId: props.comment.id})}
                            handlePostComment={() => handlePostComment(newComment, currentUserContext.id)}
                            handleCancelPostComment={toggleShowPost}
                            />
                    }}
                </UserContext.Consumer>
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
                        parentUserName={userName}
                        dateCreated={comment.dateCreated}
                        />
                })}
            </div>
        </Container>
    )
    
}

export default Comment