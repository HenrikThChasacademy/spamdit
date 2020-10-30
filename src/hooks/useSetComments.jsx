import { useEffect, useState, useCallback } from 'react';
import commentService from '../service/commentService';
import userService from '../service/userService';

export const useSetComments = (commentId) => {
    const [comments, setComments] = useState([]);
    const [showPost, setShowPost] = useState(false);
    const [savedComment, setSavedComment] = useState({});

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

    const checkLoggedInAndSetDefaultUser = useCallback(async (currentUserId) => {
        console.log(currentUserId)
        if (currentUserId === "") {
            const createdUser = await userService.createUser({name: "Anonymous"});
            if (createdUser) {
                console.log(createdUser.id);
                return createdUser.id;
            } else {
                return false;
            }    
        } 
        return currentUserId.id;
    },[])

    const handlePostComment = useCallback(async (comment, currentUserId) => {
        const checkedId = await checkLoggedInAndSetDefaultUser(currentUserId);
        if (!checkedId) return;
        toggleShowPost();
        const newComment = {...comment,
            userId: checkedId,
            dateCreated: new Date()
        }
        console.log(newComment);
        let savedComment = await commentService.saveComment(newComment);
        if (savedComment) {
            setSavedComment(savedComment);
        }
        let newComments = [...comments, savedComment];
        setComments(newComments);
        return () => {};
    }, [checkLoggedInAndSetDefaultUser, comments, toggleShowPost])

    return {
        comments,
        setComments,
        showPost,
        toggleShowPost,
        handlePostComment
    }
}