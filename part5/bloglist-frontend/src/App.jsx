import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import LoggedIn from "./components/LoggedIn"
import Alert from './components/Alert'
import blogService from './services/blogs'
import loginService from './services/login'
import { useAlert } from './hooks/useAlert'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const { alertMsg, alertType, pushAlert } = useAlert();

    useEffect(() => {
        async function fetchData() {
            const fetchedBlogs = await blogService.getAll();
            setBlogs(fetchedBlogs);
        }
        fetchData().catch(() => {
            pushAlert('Failed to fetch blogs', 'error');
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON);
            setUser(loggedUser)
            blogService.setToken(loggedUser.token);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loggedUser = await loginService.login({
                username, password
            });

            pushAlert(`${username} is successfully logged in`, 'success');

            persistUser(loggedUser);
            blogService.setToken(loggedUser.token);

            setUser(loggedUser);
            setUsername('');
            setPassword('');
        } catch (err) {
            console.error(err.response?.data?.message || 'Login failed. Please try again.');
            pushAlert(err.response?.data?.message, 'error');
        }
    }

    const persistUser = (loggedUser) => {
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(loggedUser)
        );
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        window.location.reload();
    }

    const handleBlogCreation = async (e) => {
        e.preventDefault();

        const newBlog = {
            title,
            author,
            url,
        }

        try {
            const postedBlog = await blogService.create(newBlog);
            setBlogs(blogs.concat(postedBlog));

            pushAlert(`A new blog: ${title} by ${author} was added!`, 'success');

            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (err) {
            console.error(err.response?.data?.message || 'Blog post failed. Please try again.');
            pushAlert(err.response?.data?.message, 'error');
        }
    }

    return (
        <main>
            <Alert
                message={alertMsg}
                type={alertType}
            />
            {
                user === null
                ?   <LoginForm
                        handleLogin={handleLogin}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                    />
                :   <LoggedIn
                        handleBlogCreation={handleBlogCreation}
                        title={title}
                        setTitle={setTitle}
                        author={author}
                        setAuthor={setAuthor}
                        url={url}
                        setUrl={setUrl}
                        user={user}
                        handleLogout={handleLogout}
                        blogs={blogs}
                    />
            }
        </main>
    )
}

export default App