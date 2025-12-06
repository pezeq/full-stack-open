import { useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';

const UserView = () => {
    const match = useMatch('/users/:id');
    const user = useSelector((s) => s.users).find(
        (u) => u.id === match.params.id
    );

    if (!user) return null;

    return (
        <div>
            <h3>{user.name}</h3>
            <h4>added blogs</h4>
            <ul>
                {user.blogs.map((b) => (
                    <li key={b.id}>
                        <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserView;
