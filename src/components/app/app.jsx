import React, { useState } from 'react';
import Menu from '../menu/menu';
import Spammer from '../spammer/spammer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SpamList from '../spam-list/spam-list';
import UserContext from '../../context/user-context';

function App(props) {
    const [currentUser, setCurrentUser] = useState({id: ""});
    const value = { currentUser, setCurrentUser };

    return (
        <Container fluid className="app container">
            <Row className="heading">
                <h1>Hello Spammers!</h1>
            </Row>
            <UserContext.Provider value={value}>
                <Menu />
                <hr />
                <Spammer />
                <SpamList />
            </UserContext.Provider>
        </Container>
    );
}
export default App;
