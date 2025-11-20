import { useState, useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm';
import LoggedIn from './components/LoggedIn';
import Alert from './components/Alert';
import blogService from './services/blogService.js';
import loginService from './services/loginService.js';
import { useAlert } from './hooks/useAlert';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [fetchBlogs, setFetchBlogs] = useState(false);
    const { alertMsg, alertType, pushAlert } = useAlert();
    const blogFormRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogs = await blogService.getAll();
                setBlogs(blogs);
            } catch (err) {
                console.error('Error fetching blogs:', err.response?.data);
                pushAlert('Error fetching blogs');
            }
        };
        fetchData();
    }, [fetchBlogs]);

    useEffect(() => {
        const storedUser = window.localStorage.getItem('storedUser');
        if (storedUser) {
            const parsedStoredUser = JSON.parse(storedUser);
            blogService.setToken(parsedStoredUser.token);
            setUser(parsedStoredUser);
        }
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const loggedUser = await loginService.login(credentials);
            storeLogin(loggedUser);
            blogService.setToken(loggedUser.token);
            setUser(loggedUser);
            pushAlert(`User '${loggedUser.username}' has been logged in`, 'success');
        } catch (err) {
            console.error('Error log in user:', err.response?.data);
            pushAlert(`Error log in user: ${err.response?.data?.message}`);
        }
    };

    const storeLogin = (loggedUser) => {
        window.localStorage.setItem('storedUser', JSON.stringify(loggedUser));
    };

    const handleCreateBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility();
        try {
            const createdBlog = await blogService.createNew(newBlog);
            pushAlert(`A new blog '${createdBlog.title}' has been created`, 'success');
            setFetchBlogs(!fetchBlogs);
        } catch (err) {
            console.error('Error creating new blog:', err.response?.data);
            pushAlert(`Error creating new blog: ${err.response?.data?.message}`);
        }
    };

    const handleLikeIncrease = async (blogToBeLiked) => {
        const { id, ...likes } = blogToBeLiked;
        try {
            const updatedBlog = await blogService.updateLikes(id, likes);
            pushAlert(`Blog '${updatedBlog.title}' has now ${updatedBlog.likes} likes`, 'success');
            setFetchBlogs(!fetchBlogs);
        } catch (err) {
            console.error('Error updating blog:', err.response?.data);
            pushAlert(`Error updating new blog: ${err.response?.data?.message}`);
        }
    };

    const handleRemoveBlog = async (blogToBeRemoved) => {
        const { id, title } = blogToBeRemoved;
        try {
            await blogService.removeBlog(id);
            pushAlert(`Blog '${title}' has been removed`, 'success');
            setFetchBlogs(!fetchBlogs);
        } catch (err) {
            console.error('Error removing blog:', err.response?.data);
            pushAlert(`Error removing blog: ${err.response?.data?.message}`);
        }
    };

    return (
        <main>
            <Alert
                alertMsg={alertMsg}
                alertType={alertType}
            />
            <div>
                {
                    user ? (
                        <LoggedIn
                            blogs={blogs}
                            user={user}
                            handleCreateBlog={handleCreateBlog}
                            handleLikeIncrease={handleLikeIncrease}
                            handleRemoveBlog={handleRemoveBlog}
                            blogFormRef={blogFormRef}
                        />
                    ) : (
                        <LoginForm
                            handleLogin={handleLogin}
                        />
                    )
                }
            </div>
        </main>
    );
};

export default App;