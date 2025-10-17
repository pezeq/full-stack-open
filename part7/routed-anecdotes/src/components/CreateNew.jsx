import { useField } from '../hooks/index.js';

const CreateNew = ({ addNew }) => {
    const { reset: resetContent, ...content } = useField('content', 'text');
    const { reset: resetAuthor, ...author } = useField('author', 'text');
    const { reset: resetInfo, ...info } = useField('info', 'text');

    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        });
    };

    const handleReset = () => {
        resetContent();
        resetAuthor();
        resetInfo();
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    {content.name}
                    <input {...content} />
                </div>
                <div>
                    {author.name}
                    <input {...author} />
                </div>
                <div>
                    {info.name}
                    <input {...info} />
                </div>
                <button>create</button>
                <button type={'button'} onClick={handleReset}>reset</button>
            </form>
        </div>
    );
};

export default CreateNew;