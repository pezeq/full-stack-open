import { useState } from 'react';

const CreateNewBlog = ({
    handleBlogCreation,
}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const newBlog = async (e) => {
        e.preventDefault();

        handleBlogCreation({
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
            <form onSubmit={newBlog}>
                title: <input
                    value={title}
                    type='text'
                    onChange={({ target }) => setTitle(target.value)}
                    name='Title'
                /><br/>

                author: <input
                    value={author}
                    type='text'
                    onChange={({ target }) => setAuthor(target.value)}
                    name='Author'
                /><br/>

                url: <input
                    value={url}
                    type='text'
                    onChange={({ target }) => setUrl(target.value)}
                    name='Url'
                /><br/>
                <button type='submit'>create</button>
            </form>
        </div>
    );
};

export default CreateNewBlog;