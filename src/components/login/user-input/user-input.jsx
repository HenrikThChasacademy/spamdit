import React from 'react';

function UserInput(props) {
    const { userName, handleUserInputChange } = props;

    return (
        <input type="text" value={userName} 
        onChange={(e) => handleUserInputChange(e.target.value)} /> 
    )
}

export default UserInput;