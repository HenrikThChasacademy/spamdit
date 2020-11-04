import { useEffect, useState, useCallback } from 'react';
import commentService from '../service/commentService';
import { useSetAnnonymousUser } from './useSetAnnonymousUser';

export const useSetComments = (commentId) => {
    const [comments, setComments] = useState([]);
    const [showPost, setShowPost] = useState(false);
    const { checkLoggedInAndSetDefaultUser } = useSetAnnonymousUser();

    useEffect(() => {
        let fetchComments = async() => {
            const comments = await commentService.getCommentForParent(commentId);
            setComments(comments);
        };
        fetchComments();
    }, [commentId])

    const toggleShowPost = useCallback(async () => {
        setShowPost(!showPost);
      }, [showPost])

    const handlePostComment = useCallback(async (comment, currentUserId) => {
        const userId = await checkLoggedInAndSetDefaultUser(currentUserId);
        if (!userId) return;
        toggleShowPost();
        const newComment = {...comment,
            userId: userId,
            dateCreated: new Date()
        }
        let savedComment = await commentService.saveComment(newComment);
        if (savedComment) {
            let newComments = [...comments, savedComment];
            setComments(newComments);
        }
    }, [checkLoggedInAndSetDefaultUser, comments, toggleShowPost])

    return {
        comments,
        setComments,
        showPost,
        toggleShowPost,
        handlePostComment
    }
}