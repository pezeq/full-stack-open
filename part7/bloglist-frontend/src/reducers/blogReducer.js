import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogService';
import { displayNotification } from './notificationReducer';
import { initializeUsers } from './userReducer';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        appendBlog(state, action) {
            state.push(action.payload);
        },
        removeBlog(state, action) {
            return state.filter((b) => b.id !== action.payload);
        },
        updateBlog(state, action) {
            return state.map((b) =>
                b.id !== action.payload.id ? b : action.payload
            );
        },
    },
});

const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll();
            dispatch(setBlogs(blogs));
        } catch (err) {
            console.error('Error fetching blogs:', err.response?.data);
            dispatch(
                displayNotification({
                    message: 'Error fetching blogs',
                    type: 'error',
                })
            );
        }
    };
};

export const handleCreateBlog = (newBlog) => {
    return async (dispatch) => {
        try {
            const blog = await blogService.createNew(newBlog);
            dispatch(appendBlog(blog));
            dispatch(initializeUsers());
            dispatch(
                displayNotification({
                    message: `A new blog '${blog.title}' has been created`,
                    type: 'success',
                })
            );
        } catch (err) {
            console.error('Error creating new blog:', err.response?.data);
            dispatch(
                displayNotification({
                    message: `Error creating new blog: ${err.response?.data?.message}`,
                    type: 'error',
                })
            );
        }
    };
};

export const handleLikeIncrease = (blogToBeLiked) => {
    return async (dispatch) => {
        try {
            const { id, ...likes } = blogToBeLiked;
            const blog = await blogService.updateLikes(id, likes);
            dispatch(updateBlog(blog));
            dispatch(
                displayNotification({
                    message: `Blog '${blog.title}' has now ${blog.likes} likes`,
                    type: 'success',
                })
            );
        } catch (err) {
            console.error('Error liking blog:', err.response?.data);
            dispatch(
                displayNotification({
                    message: `Error liking blog: ${err.response?.data?.message}`,
                    type: 'error',
                })
            );
        }
    };
};

export const handleRemoveBlog = (blogToBeRemoved) => {
    return async (dispatch) => {
        try {
            const { id, title } = blogToBeRemoved;
            await blogService.removeBlog(id);
            dispatch(removeBlog(id));
            dispatch(initializeUsers());
            dispatch(
                displayNotification({
                    message: `Blog '${title}' has been removed`,
                    type: 'success',
                })
            );
        } catch (err) {
            console.error('Error removing blog:', err.response?.data);
            dispatch(
                displayNotification({
                    message: `Error removing blog: ${err.response?.data?.message}`,
                    type: 'error',
                })
            );
        }
    };
};

export const handleNewComment = (blogToBeCommented) => {
    return async (dispatch) => {
        try {
            const { id, ...comment } = blogToBeCommented;
            const blog = await blogService.commentBlog(id, comment);
            dispatch(updateBlog(blog));
            dispatch(
                displayNotification({
                    message: `A new comment has been added to blog '${blog.title}'`,
                    type: 'success',
                })
            );
        } catch (err) {
            console.error('Error commenting blog:', err);
            dispatch(
                displayNotification({
                    message: `Error commenting blog: ${err.response?.data?.message}`,
                    type: 'error',
                })
            );
        }
    };
};

export default blogSlice.reducer;
