import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm.jsx';

const LoggedOut = ({ handleLogin, handleCreateUser }) => {
    const [currentForm, setCurrentForm] = useState('login');

    return (
        <div>
            {currentForm === 'login' && (
                <LoginForm
                    handleLogin={handleLogin}
                    setCurrentForm={setCurrentForm}
                />
            )}
            {currentForm === 'signup' && (
                <SignUpForm
                    handleCreateUser={handleCreateUser}
                    setCurrentForm={setCurrentForm}
                />
            )}
        </div>
    );
};

export default LoggedOut;
