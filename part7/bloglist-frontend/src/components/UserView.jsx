import { useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { ListGroup, Badge } from 'react-bootstrap';

const UserView = () => {
    const match = useMatch('/users/:id');
    const user = useSelector((s) => s.users).find(
        (u) => u.id === match.params.id
    );

    if (!user) return null;

    return (
        <div>
            <h3>{user.name}</h3>
            <h4></h4>
            <ListGroup as="ul" className="mt-3">
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    active
                >
                    Added Blogs
                </ListGroup.Item>
                {user.blogs.length > 0 ? (
                    user.blogs.map((b) => (
                        <ListGroup.Item
                            as="li"
                            key={b.id}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                            <div className="ms-auto d-flex gap-2">
                                <Badge bg="primary">{b.likes}</Badge>
                                <Badge bg="info">{b.comments.length}</Badge>
                            </div>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>No blog added yet</ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default UserView;
