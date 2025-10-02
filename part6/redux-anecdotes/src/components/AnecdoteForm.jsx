import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createNew = async (e) => {
        e.preventDefault();

        const anecdote = e.target.anecdote.value;

        if (!anecdote) {
            dispatch(showNotification('Anecdote can\'t be empty.', 2, 'error'));
            return;
        }

        e.target.anecdote.value = '';

        dispatch(createNewAnecdote(anecdote));
        dispatch(showNotification(`New anecdote '${anecdote}' created`, 2, 'success'));
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