import Blog from './Blog';
import CreateNewBlog from './CreateNewBlog';

const LoggedIn = ({ blogs, user, handleCreateBlog }) => {
    const handleLogout = () => {
        window.localStorage.removeItem('storedUser');
        window.location.reload();
    };

    return (
        <div>
            <h2>blogs</h2>
            <div>{user.name ?? user.username} logged in <button onClick={handleLogout}>logout</button></div>
            <CreateNewBlog handleCreateBlog={handleCreateBlog}/>
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
        </div>
    );
};

export default LoggedIn;

