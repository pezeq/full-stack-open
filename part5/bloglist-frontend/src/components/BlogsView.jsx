import Blog from './Blog';

const BlogsView = ({
    blogs,
    user,
    handleLikeIncrease,
    handleBlogRemove
}) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    return (
        <div>
            {
                sortedBlogs.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        handleLikeIncrease={handleLikeIncrease}
                        handleBlogRemove={handleBlogRemove}
                    />
                )
            }
        </div>
    );
};

export default BlogsView;