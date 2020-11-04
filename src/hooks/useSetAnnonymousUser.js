import { useCallback } from 'react';
import userService from '../service/userService';
import { useSetUser } from './useSetUser';

export const useSetAnnonymousUser = () => {
    const { currentUser } = useSetUser();

    const checkLoggedInAndSetDefaultUser = useCallback(async () => {
        if (currentUser.id === "") {
            const createdUser = await userService.createUser({name: "Anonymous"});
            if (createdUser) {
                return createdUser.id;
            }
        } 
        return currentUser.id;
    },[currentUser.id])

    return {
        checkLoggedInAndSetDefaultUser
    }
}
