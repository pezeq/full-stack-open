import { useQueryClient, useMutation } from '@tanstack/react-query';
import { create } from '../services/anecdoteService.js';
import { showNotification, useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const dispatch = useNotificationDispatch();

    const newAnecdote = useMutation({
        mutationFn: create,
        onSuccess: (anecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote));
            showNotification(dispatch, `Anecdote '${anecdote.content}' has been created`, 'success');
        },
        onError: () => {
            showNotification(dispatch, 'Too short... Anecdote must have length 5 or more!');
        }
    });

    const onCreate = (event) => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';

        newAnecdote.mutate({ content, votes: 0 });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
