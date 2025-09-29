import { useDispatch, useSelector } from 'react-redux';
import { upVoteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdote, filter }) => {
        if (filter === '') return anecdote;
        return anecdote.filter(a => {
            const content = a.content.toLowerCase();
            const filterLowerCase = filter.toLowerCase();
            return content.includes(filterLowerCase);
        });
    });

    const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes);

    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(upVoteAnecdote(anecdote.id));
        dispatch(showNotification(`You upvoted '${anecdote.content}' anecdote!`, 'success'));
    };

    return (
        <div>
            {sorted.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;