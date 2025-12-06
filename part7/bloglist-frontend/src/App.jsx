import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeLogin } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';
import Alert from './components/Alert';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((s) => s.loggedUser);

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeLogin());
        dispatch(initializeUsers());
    }, [dispatch]);

    return (
        <main>
            <Alert />
            <Routes>
                <Route
                    path="/*"
                    element={user ? <LoggedIn user={user} /> : <LoggedOut />}
                />
            </Routes>
        </main>
    );
};

export default App;
