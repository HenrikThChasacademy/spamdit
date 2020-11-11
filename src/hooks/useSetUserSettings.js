import { useState, useEffect, useCallback, useContext } from 'react';
import userSettingsService from '../service/userSettingsService';
import userService from '../service/userService';
import UserContext from '../context/user-context';

export const useSetUserSettings = () => {
    const [userSettings, setUserSettings] = useState(false);

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const handleGetUserSettings = useCallback(async (userSettingsId) => {
        if (!userSettingsId) {
            console.log("userSettingsId is: ", userSettingsId);
            setUserSettings({textColor: "#131313", avatarPath: "/public/spam_full.jpg"});
            return;
        }
        const fetchedUserSettings = await userSettingsService.getUserSettingsById(userSettingsId);
        if (fetchedUserSettings) {
            setUserSettings(fetchedUserSettings);
        }
    }, [])

    const saveUserSettings = useCallback(async (userSettings) => {
        const createdUserSettings = await userSettingsService.saveUserSettings(userSettings);
        if (createdUserSettings) {
            if (currentUser.userSettingsId === null) {
                const updatedUser = {...currentUser, userSettingsId: createdUserSettings.id};
                const savedUser = await userService.saveUser(updatedUser);
                console.log("user saved" , savedUser);
                if (savedUser) {
                    setCurrentUser(savedUser);
                }
            }
            setUserSettings(createdUserSettings);
        }
    }, [currentUser, setCurrentUser])

    const saveTextColor = useCallback(async (textColor) => {
        const newUserSettings = { ...userSettings, textColor: textColor.hex}
        setUserSettings(newUserSettings);
    }, [setUserSettings, userSettings])

    useEffect(() => {
        let fetchUserSettings = async () => {
            handleGetUserSettings(currentUser.userSettingsId);
        }
        fetchUserSettings();
    }, [currentUser.userSettingsId, handleGetUserSettings])

    return {
        userSettings,
        handleGetUserSettings,
        saveTextColor,
        saveUserSettings
    }
}