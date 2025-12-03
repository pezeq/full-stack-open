import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleCreateBlog } from '../reducers/blogReducer';

const CreateNewBlog = ({ blogFormRef }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        blogFormRef.current.toggleVisibility();

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
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    title:
                    <input
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    author:
                    <input
                        name="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    url:
                    <input
                        name="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default CreateNewBlog;
