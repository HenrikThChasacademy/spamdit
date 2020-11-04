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
import { Link } from 'react-router-dom';
function Spam(props){
    const { topic } = useSetTopicName(props.spam.topicId);
    const { userName } = useSetUserName(props.spam.userId);
    const { comments, showPost, toggleShowPost, handlePostComment } = useSetComments(props.spam.id);
    const { newComment, handleSetNewComment } = useSetNewComment();

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
                Spammed by 
                <Link to={`/userspam/${props.spam.userId}`}> <b>{userName}</b> </Link> at {props.spam.dateCreated}
            </div>
            <Row md={2}>
                <UserContext.Consumer>
                    {(currentUserContext) => 
                        <Vote 
                            spamId={props.spam.id}
                            currentUserId={currentUserContext.currentUser.id}
                            />    
                    }
                </UserContext.Consumer>
            </Row>
            {
                !showPost &&
                <Button variant='primary' className="comment-button" onClick={toggleShowPost}>
                    Comment
                </Button>
            }
            {
                showPost &&
                <UserContext.Consumer>
                    {(currentUserContext) =>
                        <PostComment 
                            handleTextChange={(text) => handleSetNewComment({text: text, parentId: props.spam.id})}
                            handlePostComment={() => handlePostComment(newComment, currentUserContext.currentUser.id)}
                            handleCancelPostComment={toggleShowPost}
                            />
                    }
                </UserContext.Consumer>
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
                    parentUserName={userName}
                    parentUserId={props.spam.userId}
                    dateCreated={comment.dateCreated}
                    />
            })}

        </Container>
    )
    
}

export default Spam;