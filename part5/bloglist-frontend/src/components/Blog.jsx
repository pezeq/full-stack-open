import { useState } from 'react';

const Blog = ({
    blog,
    user,
    handleLikeIncrease,
    handleBlogRemove
}) => {
    const divStyle = {
        border: '1px solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '5px'
    };

    const spanStyle = {
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
        <div style={divStyle}>
            {
                view === true
                    ? <div>
                        title: <span style={spanStyle}>{blog.title}</span>
                        url: <span style={spanStyle}>{blog.url}</span>
                        likes: <span style={spanStyle}>{blog.likes}<button onClick={updateLike}>like</button></span>
                        author: <span style={spanStyle}>{blog.author}</span>
                        user: <span style={spanStyle}>{blog.user?.name}</span>
                        <button onClick={toggleView}>hide</button>
                        {blog.user?.username === user?.username && (
                            <button onClick={deleteBlog}>remove</button>
                        )}
                    </div>
                    : <div>
                        <span>{blog.title}</span><span>{blog.author}</span>
                        <button onClick={toggleView}>view</button>
                    </div>
            }
        </div>
    );
};

export default Blog;