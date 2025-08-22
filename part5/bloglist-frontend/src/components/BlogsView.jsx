import Blog from "./Blog";

const BlogsView = ({
    user,
    handleLogout,
    blogs
}) => (
    <div>
        <h2>blogs</h2>
        <div>
            {user.name} is logged in
            <button onClick={handleLogout}>logout</button>
        </div>
        {
            blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )
        }
    </div>
);

export default BlogsView;