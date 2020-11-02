import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import UserInput from './user-input/user-input';
import './login.scss';
import { useSetUser } from '../../hooks/useSetUser';

function Login(){
    const { isLoggedIn, userName,
        handleLogin, handleLogout, handleUserInputChange } = useSetUser();

    return(
        <Row className="login-row">
            <Col>
            {
                isLoggedIn?
                <Fragment>
                    <h3>Welcome master {userName}</h3>
                    <Button onClick={handleLogout}>Logout</Button>
                </Fragment>
                :
                <Fragment>
                    <UserInput 
                        userName={userName}
                        handleUserInputChange={handleUserInputChange}/>
                    <Button onClick={handleLogin}>Login</Button>
                </Fragment>
            }
                
            </Col>
        </Row>
    )
}

export default Login;