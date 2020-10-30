import { useState, useCallback } from 'react';

export const useSetNewComment = () => {
    const [newComment, setNewComment] = useState({});

    const handleSetNewComment = useCallback((comment) => {
        setNewComment(comment);    
    }, [setNewComment])

    return {
        newComment,
        handleSetNewComment
    }
}