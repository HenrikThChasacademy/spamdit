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
import UserContext from '../../context/user-context';
import UserSettingsContext from '../../context/user-settings-context';
import { Link } from 'react-router-dom';
import ErrorFallback from '../error-fallback/error-fallback';
import { ErrorBoundary } from 'react-error-boundary';

function Spam(props){
    const { topic } = useSetTopicName(props.spam.topicId);
    const { userName } = useSetUserName(props.spam.userId);
    const { comments, showPost, toggleShowPost, handlePostComment } = useSetComments(props.spam.id);
    const { newComment, handleSetNewComment } = useSetNewComment();

    return(
        <UserContext.Consumer>
        {(currentUserContext) =>
        (
            <UserSettingsContext.Consumer>
            {(currentSettingsContext) => 
                (
                    <Container className="spam-container" style={{ backgroundColor: 
                        currentSettingsContext.userSettings.backgroundColor }}>
                        <div className="heading" style={{ color: currentSettingsContext.userSettings.textColor }}>
                            <h2 className="spam-text">{topic}</h2>
                        </div>
                        <div>
                            <p className="spam-text" 
                                    style={{ color: currentSettingsContext.userSettings.textColor }}>
                                <b>{props.spam.text}</b>
                            </p>
                        </div>
                        <br />
                        <div className="spam-info">
                            Spammed by 
                            <Link to={`/userspam/${props.spam.userId}`}> <b>{userName}</b> </Link> at {props.spam.dateCreated}
                        </div>
                        <br />
                        <Row md={2}>
                            <Vote 
                                spamId={props.spam.id}
                                currentUserId={currentUserContext.currentUser.id}
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
                                handlePostComment={() => handlePostComment(newComment, currentUserContext.currentUser.id)}
                                handleCancelPostComment={toggleShowPost}
                                />
                        }
                        <hr />
                        {
                        comments.lenght !== 0 &&
                        comments.map((comment) => {
                            return <ErrorBoundary 
                                key={comment.id}
                                FallbackComponent={ErrorFallback}>
                                    <Comment 
                                    key={comment.id}
                                    comment={comment}
                                    parentId={props.spam.id}
                                    parentUserName={userName}
                                    parentUserId={props.spam.userId}
                                    dateCreated={comment.dateCreated}/>
                                </ErrorBoundary>
                        })}

                    </Container>
                )
            }
            </UserSettingsContext.Consumer>
            )
        }
        </UserContext.Consumer>
    )
    
}

export default Spam;