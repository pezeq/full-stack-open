import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../reducers/loginReducer';
import { Form, Button, Stack } from 'react-bootstrap';

const LoginForm = ({ setCurrentForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            handleLogin({
                username,
                password,
            })
        );

        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2 className="mt-3">Sign in to BlogApp</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        value={username}
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Stack direction="horizontal" className="mt-3" gap={2}>
                    <Button type="submit">Login</Button>
                    <Button
                        type="button"
                        variant="info"
                        onClick={() => setCurrentForm('signup')}
                    >
                        Create Account
                    </Button>
                </Stack>
            </Form>
        </div>
    );
};

export default LoginForm;
