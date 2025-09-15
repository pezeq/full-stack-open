import { useState } from 'react';

const Blog = ({
    blog,
    user,
    handleLikeIncrease,
    handleBlogRemove
}) => {
    const blogContainer = {
        border: '1px solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '5px'
    };

    const blogRow = {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    };

    const blogSpan = {
        display: 'block'
    };

    const [view, setView] = useState(false);

    const toggleView = () => {
        setView(!view);
    };

    const updateLike = (e) => {
        e.preventDefault();

        handleLikeIncrease({
            id: blog.id,
            likes: ++blog.likes,
        });
    };

    const deleteBlog = () => {
        const confirm = window.confirm(
            `Remove blog ${blog.title} by ${blog.author}?`
        );

        if (confirm) {
            handleBlogRemove({
                id: blog.id,
                title: blog.title,
            });
        }
    };

    return (
        <div className="blog" style={blogContainer}>
            {
                view ? (
                    <div>
                        <span id="title" style={blogSpan}>title: {blog.title}</span>

                        <span id="url" style={blogSpan}>url: {blog.url}</span>

                        <div style={blogRow}>
                            <span id="likes" style={blogSpan}>likes: {blog.likes}</span>
                            <button id="like-btn" onClick={updateLike}>like</button>
                        </div>

                        <span id="author" style={blogSpan}>author: {blog.author}</span>

                        <span id="user" style={blogSpan}>user: {blog.user?.name}</span>

                        <div style={blogRow}>
                            <button id="hide-btn" onClick={toggleView}>hide</button>
                            {blog.user?.username === user?.username && (
                                <button id="remove-btn" onClick={deleteBlog}>remove</button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <span>{blog.title}</span> <span>{blog.author}</span>
                        <button onClick={toggleView}>view</button>
                    </div>
                )
            }
        </div>
    );
};

export default Blog;