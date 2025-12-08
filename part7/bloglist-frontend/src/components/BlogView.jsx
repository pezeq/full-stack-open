import { useDispatch, useSelector } from 'react-redux';
import {
    handleLikeIncrease,
    handleRemoveBlog,
    handleNewComment,
} from '../reducers/blogReducer';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Stack, Form, Card, Modal } from 'react-bootstrap';

const Comments = ({ blog }) => {
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const submitComment = (e) => {
        e.preventDefault();
        dispatch(handleNewComment({ id: blog.id, comment }));
        setComment('');
    };

    return (
        <div>
            <h3 className="mt-3">Comments</h3>
            <Form.Control
                as="textarea"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button className="mt-3" onClick={submitComment}>
                Add a New Comment
            </Button>
            {blog.comments.map((comment, index) => (
                <Card key={index} border="primary" className="mt-3">
                    <Card.Body>{comment}</Card.Body>
                </Card>
            ))}
        </div>
    );
};

const RemoveModal = ({ id, title }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const removeBlog = () => {
        navigate('/');
        dispatch(
            handleRemoveBlog({
                id,
                title,
            })
        );
    };

    return (
        <div>
            <Button onClick={handleShow} variant="danger">
                Remove
            </Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to <strong>remove</strong> blog '{title}
                    '?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={removeBlog}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const BlogView = ({ loggedUser }) => {
    const match = useMatch('/blogs/:id');
    const blog = useSelector((s) => s.blogs).find(
        (b) => b.id === match.params.id
    );

    const createdBy = useSelector((s) => s.users).find(
        (u) => u.id === blog.createdBy.id
    );

    const dispatch = useDispatch();

    if (!blog || !createdBy) return null;

    const updateLikes = () => {
        dispatch(
            handleLikeIncrease({
                id: blog.id,
                likes: blog.likes + 1,
            })
        );
    };

    const spanStyle = {
        display: 'block',
        marginBottom: 5,
    };

    return (
        <div>
            <h2>
                {blog.title}, by {blog.author}
            </h2>
            <span style={spanStyle}>
                <a href={blog.url} target="_blank">
                    {blog.url}
                </a>
            </span>
            <span style={spanStyle}>
                <strong>Likes:</strong> {blog.likes} |{' '}
                <strong>Comments: </strong> {blog.comments.length}
            </span>
            <span style={spanStyle}>
                Added by:{' '}
                <Link to={`/users/${createdBy.id}`}>{createdBy.name}</Link>
            </span>
            <Stack direction="horizontal" className="mt-3" gap={2}>
                <Button onClick={updateLikes}>Like</Button>
                {createdBy.id === loggedUser.id && (
                    <RemoveModal id={blog.id} title={blog.title} />
                )}
            </Stack>
            <Comments blog={blog} />
        </div>
    );
};

export default BlogView;
