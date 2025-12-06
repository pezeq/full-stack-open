import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogsList = () => {
    const blogs = useSelector((s) => s.blogs);
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    const blogStyle = {
        padding: '5px',
        border: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        margin: '5px 0px 5px 0px',
    };

    return (
        <div>
            {sortedBlogs.map((b) => (
                <div key={b.id} style={blogStyle}>
                    <span>
                        <Link to={`blogs/${b.id}`}>
                            {b.title}, {b.author}
                        </Link>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default BlogsList;
