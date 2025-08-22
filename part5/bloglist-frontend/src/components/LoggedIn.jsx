import BlogsView from './BlogsView'
import CreateNewBlog from "./CreateNewBlog"

const LoggedIn = ({
    handleBlogCreation,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
    user,
    handleLogout,
    blogs
}) => (
    <div>
        <BlogsView
            user={user}
            handleLogout={handleLogout}
            blogs={blogs}
        />
        <CreateNewBlog
            handleBlogCreation={handleBlogCreation}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
        />
    </div>
)

export default LoggedIn;