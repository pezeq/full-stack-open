import CreateNewBlog from './CreateNewBlog';
import Togglable from './Togglable';
import BlogsList from './BlogsList';
import BlogView from './BlogView';
import UsersList from './UsersList';
import UserView from './UserView';
import { useEffect, useRef } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { initializeBlogs } from '../reducers/blogReducer';
import { initializeUsers } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';

const Menu = ({ loggedUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        window.localStorage.removeItem('storedUser');
        window.location.reload();
    };

    return (
        <Navbar
            collapseOnSelect
            expand="sm"
            className="my-3 px-3 rounded-3 bg-primary-subtle"
        >
            <Navbar.Toggle aria-controls="responsive-nav-bar" />
            <Navbar.Collapse id="responsive-nav-bar">
                <Navbar.Brand>
                    <strong>BlogApp</strong>
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href="#" as="span">
                        <Link to="/">Blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/users">Users</Link>
                    </Nav.Link>
                </Nav>
                <Navbar.Text className="ms-auto">
                    Logged as:{' '}
                    <Link to={`/users/${loggedUser.id}`}>
                        {loggedUser.name ?? loggedUser.username}
                    </Link>
                </Navbar.Text>
                <Nav.Item className="ms-2">
                    <Button size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                </Nav.Item>
            </Navbar.Collapse>
        </Navbar>
    );
};

const Home = () => {
    const blogFormRef = useRef();

    return (
        <div>
            <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
                <CreateNewBlog blogFormRef={blogFormRef} />
            </Togglable>
            <BlogsList />
        </div>
    );
};

const LoggedIn = ({ loggedUser }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUsers());
    }, [dispatch]);

    return (
        <div>
            <Menu loggedUser={loggedUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/users/:id" element={<UserView />} />
                <Route
                    path="/blogs/:id"
                    element={<BlogView loggedUser={loggedUser} />}
                />
            </Routes>
        </div>
    );
};

export default LoggedIn;
