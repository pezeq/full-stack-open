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
                    ?   <div>
                            title: {blog.title}<br />
                            url: {blog.url}<br />
                            likes: {blog.likes} <button onClick={updateLike}>like</button><br />
                            author: {blog.author}<br />
                            user: {blog.user.name}<br />
                        <button onClick={toggleView}>hide</button><br />
                        {
                            blog.user.username === user.username
                                ? <button onClick={deleteBlog}>remove</button>
                                : null
                        }
                    </div>
                    :   <div>
                        {blog.title} {blog.author}
                        <button onClick={toggleView}>view</button>
                    </div>
            }
        </div>
    );
};

export default Blog;