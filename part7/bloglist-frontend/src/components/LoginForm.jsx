import { useState } from 'react';

const LoginForm = ({ handleLogin, setCurrentForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        handleLogin({
            username,
            password,
        });

        setUsername('');
        setPassword('');
    };

    const labelStyle = {
        display: 'block',
    };

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle}>
                    username
                    <input
                        name="username"
                        type="text"
                        value={username}
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label style={labelStyle}>
                    password
                    <input
                        name="password"
                        type="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">login</button>
                <button type="button" onClick={() => setCurrentForm('signup')}>
                    create account
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
