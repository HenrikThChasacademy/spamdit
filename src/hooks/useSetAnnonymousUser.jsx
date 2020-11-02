import { useCallback } from 'react';
import userService from '../service/userService';

export const useSetAnnonymousUser = () => {

    const checkLoggedInAndSetDefaultUser = useCallback(async (currentUserId) => {
        if (currentUserId === "") {
            const createdUser = await userService.createUser({name: "Anonymous"});
            if (createdUser) {
                return createdUser.id;
            }
        } 
        return currentUserId.id;
    },[])

    return {
        checkLoggedInAndSetDefaultUser
    }
}
