import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';
import Alert from './components/Alert';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((s) => s.user);

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    return (
        <main>
            <Alert />
            <div>{user ? <LoggedIn /> : <LoggedOut />}</div>
        </main>
    );
};

export default App;
