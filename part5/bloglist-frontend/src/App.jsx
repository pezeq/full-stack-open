import { useState, useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm';
import LoggedIn from './components/LoggedIn';
import Alert from './components/Alert';
import blogService from './services/blogs';
import loginService from './services/login';
import { useAlert } from './hooks/useAlert';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const { alertMsg, alertType, pushAlert } = useAlert();

    useEffect(() => {
        async function fetchData() {
            const fetchedBlogs = await blogService.getAll();
            setBlogs(fetchedBlogs);
        }
        fetchData().catch(() => {
            pushAlert('Failed to fetch blogs', 'error');
        });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON);
            setUser(loggedUser);
            blogService.setToken(loggedUser.token);
        }
    }, []);

    const blogFormRef = useRef();

    if (!blogs) return null;

    const handleLogin = async (sessionUser) => {
        try {
            const loggedUser = await loginService.login(sessionUser);

            pushAlert(`${sessionUser.username} is successfully logged in`, 'success');

            persistUser(loggedUser);
            blogService.setToken(loggedUser.token);
            setUser(loggedUser);
        } catch (err) {
            console.error(err.response?.data?.message || 'Login failed. Please try again.');
            pushAlert(err.response?.data?.message, 'error');
        }
    };

    const persistUser = (loggedUser) => {
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(loggedUser)
        );
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        window.location.reload();
    };

    const handleBlogCreation = async (newBlog) => {
        blogFormRef.current.toggleVisibility();

        try {
            const postedBlog = await blogService.create(newBlog);
            setBlogs(blogs.concat(postedBlog));
            pushAlert(`A new blog: ${newBlog.title} by ${newBlog.author} was added!`, 'success');
        } catch (err) {
            console.error(err.response?.data?.message || 'Blog post failed. Please try again.');
            pushAlert(err.response?.data?.message, 'error');
        }
    };

    const handleBlogRemove = async (deletedBlog) => {
        try {
            await blogService.remove(deletedBlog.id);
            setBlogs(blogs.filter(b =>
                b.id !== deletedBlog.id
            ));
            pushAlert(`Blog: ${deletedBlog.title} has been deleted!`, 'success');
        } catch (err) {
            console.error(err.response?.data?.message || 'Blog delete failed. Please try again.');
            pushAlert(err.response?.data?.message, 'error');
        }
    };

    const handleLikeIncrease = async (updatedBlog) => {
        try {
            const res = await blogService.update(updatedBlog);
            pushAlert(`Blog: ${res.title} has ${res.likes} likes!`, 'success');
        } catch (err) {
            console.error(err.response?.data?.message || 'Blog update failed. Please try again.');
            pushAlert(err.response?.data?.message, 'error');
        }
    };

    return (
        <main>
            <Alert
                message={alertMsg}
                type={alertType}
            />
            {
                user ? (
                    <LoggedIn
                        handleBlogCreation={handleBlogCreation}
                        handleLogout={handleLogout}
                        handleLikeIncrease={handleLikeIncrease}
                        handleBlogRemove={handleBlogRemove}
                        user={user}
                        blogs={blogs}
                        blogFormRef={blogFormRef}
                    />
                ) : (
                    <LoginForm
                        handleLogin={handleLogin}
                    />
                )
            }
        </main>
    );
};

export default App;