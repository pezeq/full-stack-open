import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const UsersList = () => {
    const users = useSelector((s) => s.users);

    return (
        <Table striped hover>
            <thead>
                <tr>
                    <th>Users</th>
                    <th>Blogs Created</th>
                </tr>
            </thead>
            <tbody>
                {users.map((u) => (
                    <tr key={u.id}>
                        <td>
                            <Link to={`/users/${u.id}`}>{u.name}</Link>
                        </td>
                        <td>{u.blogs.length}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UsersList;
