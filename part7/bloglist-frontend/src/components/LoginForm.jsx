import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        handleLogin({
            username,
            password
        });

        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    username
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label><br />
                <label>
                    password
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label><br />
                <button type={'submit'}>login</button>
            </form>
        </div>
    );
};

export default LoginForm;