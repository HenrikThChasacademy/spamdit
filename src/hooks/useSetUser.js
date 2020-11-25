import { useContext, useState, useCallback } from 'react';
import userService from '../service/userService';
import spamService from '../service/spamService';
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
            const spam = await spamService.getSpamForUser(createdUser.id);
            if (spam) {
                var user = {...createdUser, nrOfSpam: spam.length}
                setCurrentUser(user);
                setIsLoggedIn(true);
            }
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