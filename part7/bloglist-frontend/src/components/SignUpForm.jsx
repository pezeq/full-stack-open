import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleCreateUser } from '../reducers/loginReducer';
import { Form, Button, Stack } from 'react-bootstrap';

const SignUpForm = ({ setCurrentForm }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            handleCreateUser({
                name,
                username,
                password,
            })
        );

        setName('');
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2 className="mt-3">Sign up to BlogApp</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        value={name}
                        autoComplete="given-name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        value={username}
                        autoComplete="new-username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Stack direction="horizontal" className="mt-3" gap={2}>
                    <Button type="submit">Create Account</Button>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => setCurrentForm('login')}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Form>
        </div>
    );
};

export default SignUpForm;
