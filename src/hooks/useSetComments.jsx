import { useEffect, useState, useCallback } from 'react';
import commentService from '../service/commentService';

export const useSetComments = (commentId) => {
    const [comments, setComments] = useState([]);
    const [showPost, setShowPost] = useState(false);
    useEffect(() => {
        let fetchComments = async() => {
            const comments = await commentService.getCommentForParent(commentId);
            setComments(comments);
        };
        fetchComments();
        
        return () => {};
    }, [commentId])

    const toggleShowPost = useCallback(async () => {
        setShowPost(!showPost);
        return () => {};
      }, [showPost])

    const handlePostComment = useCallback(async (handlePostComment) => {
        toggleShowPost();
        const newComment = await handlePostComment();
        let newComments = [...comments, newComment];
        setComments(newComments);
        return () => {};
    }, [comments, setComments, toggleShowPost])

    return {
        comments,
        setComments,
        showPost,
        toggleShowPost,
        handlePostComment
    }
}