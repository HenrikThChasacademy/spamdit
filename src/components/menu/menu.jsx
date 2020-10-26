import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import UserInput from './user-input/user-input';
import './menu.scss';

function Menu(props) {
    return(
        <Row className="menu-row">
            <Col>
            {
                props.isLoggedIn?
                <Fragment>
                    <h3>Welcome master {props.userName}</h3>
                    <Button onClick={props.handleLogout}>Logout</Button>
                </Fragment>
                :
                <Fragment>
                    <UserInput 
                        userName={props.userName}
                        handleUserInputChange={props.handleUserInputChange}/>
                    <Button onClick={props.handleLogin}>Login</Button>
                </Fragment>
            }
                
            </Col>
        </Row>
    )
}

export default Menu;