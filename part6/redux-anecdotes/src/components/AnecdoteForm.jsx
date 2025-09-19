import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createNew = (e) => {
        e.preventDefault();

        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value = '';

        dispatch(createNewAnecdote(anecdote));
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name={'anecdote'} /></div>
                <button type={'submit'}>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;