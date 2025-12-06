import CreateNewBlog from './CreateNewBlog';
import Togglable from './Togglable';
import BlogsList from './BlogsList';
import BlogView from './BlogView';
import UsersList from './UsersList';
import UserView from './UserView';
import { useRef } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

const LoggedUser = ({ user, handleLogout }) => (
    <div>
        | {user.name ?? user.username} logged in
        <button style={{ marginLeft: 5 }} onClick={handleLogout}>
            logout
        </button>
    </div>
);

const LoggedIn = ({ user }) => {
    const navigate = useNavigate();
    const blogFormRef = useRef();

    const handleLogout = () => {
        navigate('/');
        window.localStorage.removeItem('storedUser');
        window.location.reload();
    };

    return (
        <div>
            <h2>BlogApp</h2>
            <table style={{ marginBottom: 20 }}>
                <thead>
                    <tr>
                        <th>
                            <Link to="/">blogs</Link>
                        </th>
                        <th>
                            <Link to="/users">users</Link>
                        </th>
                        <th>
                            <LoggedUser
                                user={user}
                                handleLogout={handleLogout}
                            />
                        </th>
                    </tr>
                </thead>
            </table>

            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <Togglable
                                buttonLabel="create new blog"
                                ref={blogFormRef}
                            >
                                <CreateNewBlog blogFormRef={blogFormRef} />
                            </Togglable>
                            <BlogsList />
                        </div>
                    }
                />
                <Route path="/users" element={<UsersList />} />
                <Route path="/users/:id" element={<UserView />} />
                <Route path="/blogs/:id" element={<BlogView />} />
            </Routes>
        </div>
    );
};

export default LoggedIn;
