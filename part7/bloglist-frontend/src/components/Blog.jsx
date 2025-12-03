import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    handleLikeIncrease,
    handleRemoveBlog,
} from '../reducers/blogReducer.js';

const Blog = ({ blog }) => {
    const [fullView, setFullView] = useState(false);
    const username = useSelector((s) => s.user.username);
    const dispatch = useDispatch();

    const blogStyle = {
        padding: '5px',
        border: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        margin: '5px 0px 5px 0px',
    };

    const spanStyle = {
        display: 'block',
    };

    const updateLikes = () => {
        dispatch(
            handleLikeIncrease({
                id: blog.id,
                likes: blog.likes + 1,
            })
        );
    };

    const removeBlog = () => {
        const confirm = window.confirm(`Remove blog '${blog.title}'?`);

        if (confirm) {
            dispatch(
                handleRemoveBlog({
                    id: blog.id,
                    title: blog.title,
                })
            );
        }
    };

    return (
        <div>
            {fullView ? (
                <div style={blogStyle}>
                    <span style={spanStyle}>
                        {blog.title}{' '}
                        <button onClick={() => setFullView(!fullView)}>
                            hide
                        </button>
                    </span>
                    <span style={spanStyle}>{blog.url}</span>
                    <span style={spanStyle}>
                        likes {blog.likes}{' '}
                        <button onClick={updateLikes}>like</button>
                    </span>
                    <span style={spanStyle}>{blog.author}</span>
                    {blog.createdBy.username === username && (
                        <button onClick={removeBlog}>remove</button>
                    )}
                </div>
            ) : (
                <div style={blogStyle}>
                    {blog.title}, {blog.author}
                    <button onClick={() => setFullView(!fullView)}>view</button>
                </div>
            )}
        </div>
    );
};

export default Blog;
