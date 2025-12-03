import Blog from './Blog';
import { useSelector } from 'react-redux';

const BlogView = () => {
    const blogs = useSelector((s) => s.blogs);
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <div>
            <div>
                {sortedBlogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogView;
