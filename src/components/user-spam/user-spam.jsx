import React, { Fragment } from 'react';
import { useSetUserSpam } from '../../hooks/useSetUserSpam';
import { useSetUserName } from '../../hooks/useSetUserName';
import Container from 'react-bootstrap/Container';
import Spam from '../spam/spam';
import { useParams } from 'react-router-dom';
export default function UserSpam(props) {
    const user = useParams();
    const { userSpam } = useSetUserSpam(user.userId);
    const { userName } = useSetUserName(user.userId);
    return (
        <Fragment>
            <Container>
                <h2>Spam by: {userName}</h2>
            </Container>
            <Container>
                {   
                    userSpam.lenght !== 0 &&
                    userSpam.map(spam => 
                        <Container key={spam.id} fluid>
                            <Spam 
                                key={spam.id}
                                spam={spam}/>
                        </Container>
                    )
                }
            </Container>
        </Fragment>
    )
}
