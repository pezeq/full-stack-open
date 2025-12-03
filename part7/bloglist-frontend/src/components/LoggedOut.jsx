import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoggedOut = () => {
    const [currentForm, setCurrentForm] = useState('login');

    return (
        <div>
            {currentForm === 'login' && (
                <LoginForm setCurrentForm={setCurrentForm} />
            )}
            {currentForm === 'signup' && (
                <SignUpForm setCurrentForm={setCurrentForm} />
            )}
        </div>
    );
};

export default LoggedOut;
