import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleCreateBlog } from '../reducers/blogReducer';
import { Button, Form, Stack } from 'react-bootstrap';

const CreateNewBlog = ({ blogFormRef }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const dispatch = useDispatch();

    const hide = () => {
        blogFormRef.current.toggleVisibility();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        hide();

        dispatch(
            handleCreateBlog({
                title,
                author,
                url,
            })
        );

        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <div>
            <h2>Create New Blog</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-3">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Author:</Form.Label>
                    <Form.Control
                        name="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Blog's link:</Form.Label>
                    <Form.Control
                        name="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </Form.Group>
                <Stack direction="horizontal" className="mt-3" gap={2}>
                    <Button onClick={handleSubmit}>Create</Button>
                    <Button onClick={hide} variant="danger">
                        Cancel
                    </Button>
                </Stack>
            </Form>
        </div>
    );
};

export default CreateNewBlog;
