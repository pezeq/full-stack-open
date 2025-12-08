import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const BlogsList = () => {
    const blogs = useSelector((s) => s.blogs);
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <Table striped hover className="mt-3">
            <thead>
                <tr>
                    <th>Blogs Title</th>
                    <th>Blogs Author</th>
                </tr>
            </thead>
            <tbody>
                {sortedBlogs.map((b) => (
                    <tr key={b.id}>
                        <td>
                            <Link to={`blogs/${b.id}`}>{b.title}</Link>
                        </td>
                        <td>{b.author}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default BlogsList;
