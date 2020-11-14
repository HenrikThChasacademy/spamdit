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
import UserSettingsContext from '../../../context/user-settings-context';
import { Link } from 'react-router-dom';
import ErrorFallback from '../../error-fallback/error-fallback';
import { ErrorBoundary } from 'react-error-boundary';

function Comment(props) {
    
    const { userName } = useSetUserName(props.comment.userId);
    const { comments, showPost, toggleShowPost, handlePostComment } = 
        useSetComments(props.comment.id);
    const { newComment, handleSetNewComment } = useSetNewComment();

    return(
        <UserContext.Consumer>
        {(currentUserContext) =>
        (
            <UserSettingsContext.Consumer>
            {(currentSettingsContext) => 
                (
                    <Container fluid className="comment-container" style={{ backgroundColor: 
                        currentSettingsContext.userSettings.backgroundColor }}>
                        <div className="spam-info">
                            <Link to={`/userspam/${props.comment.userId}`}> <b>{userName}</b> </Link> replied to 
                            <Link to={`/userspam/${props.parentUserId}`}> <b>{props.parentUserName}</b> </Link> 
                            at {props.comment.dateCreated}
                        </div>
                        <br />
                        <p className="comment-text" style={{ color: currentSettingsContext.userSettings.textColor }}>
                            <b>{props.comment.text}</b></p>
                        <Row md={2}>
                            <Vote 
                                commentId={props.comment.id}
                                currentUserId={currentUserContext.currentUser.id}
                                />
                        </Row>
                        {
                            !showPost &&
                            <Button className="reply-button" size="sm" onClick={toggleShowPost}>
                                Reply
                            </Button>
                        }
                        {
                            showPost &&
                            <PostComment 
                                handleTextChange={(text) => handleSetNewComment({ text: text, parentId: props.comment.id})}
                                handlePostComment={() => handlePostComment(newComment, currentUserContext.currentUser.id)}
                                handleCancelPostComment={toggleShowPost}
                                />

                        }
                        <div className="comment-reply-container">
                        <hr />
                        {
                        comments.length !== 0 &&
                        comments.map((comment) => {
                                return <ErrorBoundary 
                                    key={comment.id}
                                    FallbackComponent={ErrorFallback}>
                                        <Comment 
                                        key={comment.id}
                                        comment={comment}
                                        parentId={props.comment.Id}
                                        parentUserName={userName}
                                        parentUserId={props.comment.userId}
                                        dateCreated={comment.dateCreated}/>
                                    </ErrorBoundary>
                            })}
                        </div>
                    </Container>
                )
            }
            </UserSettingsContext.Consumer>
            )
        }
        </UserContext.Consumer>
    )
    
}

export default Comment