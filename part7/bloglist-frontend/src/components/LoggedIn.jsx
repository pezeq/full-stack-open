import CreateNewBlog from './CreateNewBlog';
import Togglable from './Togglable';
import BlogView from './BlogView';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const LoggedIn = () => {
    const handleLogout = () => {
        window.localStorage.removeItem('storedUser');
        window.location.reload();
    };

    const user = useSelector((s) => s.user);
    const blogFormRef = useRef();

    return (
        <div>
            <h2>blogs</h2>
            <div>
                {user.name ?? user.username} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <CreateNewBlog blogFormRef={blogFormRef} />
            </Togglable>
            <BlogView />
        </div>
    );
};

export default LoggedIn;
