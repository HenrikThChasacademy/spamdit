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
    const { userSettings, saveTextColor, saveBackgroundColor, saveUserSettings } = useSetUserSettings();
    const [displayTextColorPicker, setDisplayTextColorPicker] = useState(false);
    const [displayBackgroundColorPicker, setDisplayBackgroundColorPicker] = useState(false);

    const handleTextColorClick = () => {
        if (displayTextColorPicker) {
            saveUserSettings(userSettings)
        }
        setDisplayTextColorPicker(!displayTextColorPicker);
    };

    const handleBackgroundColorClick = () => {
        if (displayBackgroundColorPicker) {
            saveUserSettings(userSettings)
        }
        setDisplayBackgroundColorPicker(!displayBackgroundColorPicker);
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
                {isLoggedIn &&
                <Fragment>
                    <Col>
                    <Button onClick={ handleTextColorClick }>Change Text
                    </Button>
                    { 
                    displayTextColorPicker ? 
                    <SketchPicker color={ userSettings.textColor } onChange={ saveTextColor } />
                    : <Row> 
                        <p>Color: </p><div className="user-color" style={{ backgroundColor: userSettings.textColor }}></div>
                        </Row> 
                    }
                    </Col>
                    <Col>
                    <Button onClick={ handleBackgroundColorClick }>Change Backgorund
                    </Button>
                    { 
                    displayBackgroundColorPicker ? 
                    <SketchPicker color={ userSettings.backgroundColor } onChange={ saveBackgroundColor } />
                    : <Row> <p>Color: </p><div className="user-color" style={{ backgroundColor: userSettings.backgroundColor }}></div>
                        </Row>
                     }
                    </Col>
                </Fragment>
            }
        </Row>
    )
}

export default Login;