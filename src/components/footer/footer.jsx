import React, { Component } from 'react';
import "./footer.scss";
import UserContext from '../../context/user-context';

class Footer extends Component {

    render() {
        return(
            <UserContext.Consumer>
                {(currentUserContext) =>
                <div className="footer">
                    {currentUserContext.currentUser.id &&
                    <div>
                        Nr of spam you made: <b>{currentUserContext.currentUser.nrOfSpam}</b> Keep up the good job!
                    </div>
                    }
                    
                    <div>
                    This spam app is the best!
                    </div>
                </div>
            }
            </UserContext.Consumer>
     
        );

    }
}

export default Footer;