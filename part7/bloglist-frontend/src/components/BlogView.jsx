import Blog from './Blog';

const BlogView = ({ blogs, handleLikeIncrease, handleRemoveBlog }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <div>
            <div>
                {sortedBlogs.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLikeIncrease={handleLikeIncrease}
                        handleRemoveBlog={handleRemoveBlog}
                    />
                )}
            </div>
        </div>
    );
};

export default BlogView;