import React, { Fragment, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import UserInput from './user-input/user-input';
import './login.scss';
import { useSetUser } from '../../hooks/useSetUser';
import { useSetUserSettings } from '../../hooks/useSetUserSettings';
import { SketchPicker } from 'react-color';

function Login(){
    const { isLoggedIn, userName,
        handleLogin, handleLogout, handleUserInputChange } = useSetUser();
    const { userSettings, saveTextColor, saveUserSettings } = useSetUserSettings();
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        if (displayColorPicker) {
            saveUserSettings(userSettings)
        }

        setDisplayColorPicker(!displayColorPicker);
    };
    
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
            <Col>
            

                <Button onClick={ handleClick }>Change Text
                </Button>
                { 
                displayColorPicker ? 
                <SketchPicker color={ userSettings.textColor } onChange={ saveTextColor } />
                : <p>Color: { userSettings.textColor } </p> }

            
            </Col>

        </Row>
    )
}

export default Login;