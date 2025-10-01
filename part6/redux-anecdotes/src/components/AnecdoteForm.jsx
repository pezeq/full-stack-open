import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';
import anecdoteService from '../../services/anecdoteService';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createNew = async (e) => {
        e.preventDefault();

        const anecdote = e.target.anecdote.value;

        if (!anecdote) {
            dispatch(showNotification('Anecdote can\'t be empty.', 'error'));
            return;
        }

        e.target.anecdote.value = '';

        const newAnecdote = await anecdoteService.createNew(anecdote);

        dispatch(createNewAnecdote(newAnecdote));
        dispatch(showNotification(`New anecdote '${anecdote}' created`, 'success'));
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