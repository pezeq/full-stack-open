import { useState } from 'react';

const LoginForm = ({
    handleLogin
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const sessionUser = async (e) => {
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
            <form onSubmit={sessionUser}>
                <div>
                    username
                    <input
                        value={username}
                        type='text'
                        onChange={({ target }) => setUsername(target.value)}
                        name='Username'
                    />
                </div>
                <div>
                    password
                    <input
                        value={password}
                        type='password'
                        onChange={({ target }) => setPassword(target.value)}
                        name='Password'
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    );
};

export default LoginForm;