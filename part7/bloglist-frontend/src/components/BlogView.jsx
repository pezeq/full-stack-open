import Blog from './Blog';

const BlogView = ({
    blogs,
    handleLikeIncrease,
    handleRemoveBlog,
    username,
}) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <div>
            <div>
                {sortedBlogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLikeIncrease={handleLikeIncrease}
                        handleRemoveBlog={handleRemoveBlog}
                        username={username}
                    />
                ))}
            </div>
        </div>
    );
};

export default BlogView;
