import { useDispatch, useSelector } from 'react-redux';
import {
    handleLikeIncrease,
    handleRemoveBlog,
    handleNewComment,
} from '../reducers/blogReducer';
import { useMatch, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Comments = ({ blog }) => {
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const submitComment = (e) => {
        e.preventDefault();
        console.log(`comment`, comment);
        dispatch(handleNewComment({ id: blog.id, comment }));
        setComment('');
    };

    return (
        <div>
            <h3>comments</h3>
            <input
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={submitComment}>add a new comment</button>
            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

const BlogView = () => {
    const match = useMatch('/blogs/:id');
    const blog = useSelector((s) => s.blogs).find(
        (b) => b.id === match.params.id
    );

    const username = useSelector((s) => s.loggedUser.username);
    const createdBy = useSelector((s) => s.users).find(
        (u) => u.username === username
    );

    const dispatch = useDispatch();

    const navigate = useNavigate();

    if (!blog || !username || !createdBy) return null;

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
            navigate('/');
            dispatch(
                handleRemoveBlog({
                    id: blog.id,
                    title: blog.title,
                })
            );
        }
    };

    const spanStyle = {
        display: 'block',
        marginBottom: 5,
    };

    return (
        <div>
            <h2>
                {blog.title}, by {blog.author}
            </h2>
            <span style={spanStyle}>
                <a href={blog.url} target="_blank">
                    {blog.url}
                </a>
            </span>
            <span style={spanStyle}>
                <strong>likes</strong> {blog.likes} | <strong>comments </strong>{' '}
                {blog.comments.length}
            </span>
            <span style={spanStyle}>added by {createdBy.name}</span>
            <button onClick={updateLikes}>like</button>
            {blog.createdBy.username === username && (
                <button onClick={removeBlog}>remove</button>
            )}
            <Comments blog={blog} />
        </div>
    );
};

export default BlogView;
