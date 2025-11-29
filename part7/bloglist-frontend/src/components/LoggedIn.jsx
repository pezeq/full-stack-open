import CreateNewBlog from './CreateNewBlog';
import Togglable from './Togglable';
import BlogView from './BlogView';

const LoggedIn = ({
    blogs,
    user,
    handleCreateBlog,
    handleLikeIncrease,
    handleRemoveBlog,
    blogFormRef,
}) => {
    const handleLogout = () => {
        window.localStorage.removeItem('storedUser');
        window.location.reload();
    };

    return (
        <div>
            <h2>blogs</h2>
            <div>
                {user.name ?? user.username} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
                <CreateNewBlog handleCreateBlog={handleCreateBlog} />
            </Togglable>
            <BlogView
                blogs={blogs}
                handleLikeIncrease={handleLikeIncrease}
                handleRemoveBlog={handleRemoveBlog}
                username={user.username}
            />
        </div>
    );
};

export default LoggedIn;
