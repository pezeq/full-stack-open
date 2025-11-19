import { useState } from 'react';

const CreateNewBlog = ({ handleCreateBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        handleCreateBlog({
            title,
            author,
            url,
        });

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
                </label><br />
                <label>
                    author:
                    <input
                        name="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </label><br />
                <label>
                    url:
                    <input
                        name="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </label><br />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default CreateNewBlog;