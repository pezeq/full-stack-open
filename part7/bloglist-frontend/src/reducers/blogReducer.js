import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogService';
import { displayNotification } from './notificationReducer';

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
            const createdBlog = await blogService.createNew(newBlog);
            dispatch(appendBlog(createdBlog));
            dispatch(
                displayNotification({
                    message: `A new blog '${createdBlog.title}' has been created`,
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
            const updatedBlog = await blogService.updateLikes(id, likes);
            dispatch(updateBlog(updatedBlog));
            dispatch(
                displayNotification({
                    message: `Blog '${updatedBlog.title}' has now ${updatedBlog.likes} likes`,
                    type: 'success',
                })
            );
        } catch (err) {
            console.error('Error updating blog:', err.response?.data);
            dispatch(
                displayNotification({
                    message: `Error updating new blog: ${err.response?.data?.message}`,
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

export default blogSlice.reducer;
