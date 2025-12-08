import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeLogin } from './reducers/loginReducer';
import { Routes, Route } from 'react-router-dom';
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';
import Notification from './components/Notification';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeLogin());
    }, [dispatch]);

    const loggedUser = useSelector((s) => s.loggedUser);

    return (
        <div className="container">
            <Notification />
            <Routes>
                <Route
                    path="/*"
                    element={
                        loggedUser ? (
                            <LoggedIn loggedUser={loggedUser} />
                        ) : (
                            <LoggedOut />
                        )
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
