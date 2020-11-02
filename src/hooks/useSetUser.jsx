import { useContext, useState, useCallback } from 'react';
import userService from '../service/userService';
import UserContext from '../context/user-context';

export const useSetUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    const { currentUser, setCurrentUser } = useContext(UserContext);
    
    const handleLogin = useCallback(async () => {
        if (userName.length === 0) {
            return;
        }
        const createdUser = await userService.createUser({name: userName});
        if (createdUser) {
            setCurrentUser(createdUser);
            setIsLoggedIn(true);
        }
    }, [setCurrentUser, userName])

    const handleLogout = useCallback(async () => {
        setCurrentUser({id: ""});
        setIsLoggedIn(false);
    }, [setCurrentUser])

    const handleUserInputChange = useCallback(async (userName) => {
        setUserName(userName);
    }, [])

    return {
        currentUser,
        userName,
        isLoggedIn,
        handleLogin,
        handleLogout,
        handleUserInputChange  
    }
}