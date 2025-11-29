import { useState } from 'react';

const SignUpForm = ({ handleCreateUser, setCurrentForm }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        handleCreateUser({
            name,
            username,
            password,
        });

        setName('');
        setUsername('');
        setPassword('');
    };
    const labelStyle = {
        display: 'block',
    };

    return (
        <div>
            <h2>sign up to application</h2>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle}>
                    name
                    <input
                        name="name"
                        type="text"
                        value={name}
                        autoComplete="given-name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label style={labelStyle}>
                    username
                    <input
                        name="username"
                        type="text"
                        value={username}
                        autoComplete="new-username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label style={labelStyle}>
                    password
                    <input
                        name="password"
                        type="password"
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">create account</button>
                <button type="button" onClick={() => setCurrentForm('login')}>
                    cancel
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
