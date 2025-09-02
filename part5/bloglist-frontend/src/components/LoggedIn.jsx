import BlogsView from './BlogsView';
import CreateNewBlog from './CreateNewBlog';
import Togglable from './Togglable';

const LoggedIn = ({
    handleBlogCreation,
    handleLogout,
    handleLikeIncrease,
    handleBlogRemove,
    user,
    blogs,
    blogFormRef
}) => (
    <div>
        <h2>blogs</h2>
        <div>
            {user.name} is logged in
            <button onClick={handleLogout}>logout</button>
        </div>
        <BlogsView
            blogs={blogs}
            user={user}
            handleLikeIncrease={handleLikeIncrease}
            handleBlogRemove={handleBlogRemove}
        />
        <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
            <CreateNewBlog
                handleBlogCreation={handleBlogCreation}
            />
        </Togglable>
    </div>
);

export default LoggedIn;