import React, { Component } from 'react';
import Spam from '../spam/spam';
import Menu from '../menu/menu';
import Spammer from '../spammer/spammer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import spamService from '../../service/spamService';

class App extends Component {
    state = {
        spam: []
    }
    
    componentDidMount() {
        this.fetchSpam();
    }

    fetchSpam = async () => {
        let spam = await spamService.getSpam();
        if (spam) {
            this.setState({spam: spam})
        }
    }

    render() {

        return (
            <Container fluid className="app container">
                <Row className="heading">
                    <h1>Hello Spammers!</h1>
                </Row>
                <Menu />
                <hr />
                <Spammer />
                {this.state.spam.map(spam => {
                    return <Spam 
                    key={spam.id}
                    spam={spam}
                    />
                })
                }
            </Container>
        );
    }
}
export default App;
