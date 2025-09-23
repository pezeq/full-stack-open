import { useDispatch, useSelector } from 'react-redux';
import { upVoteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdote, filter }) => {
        if (filter === '') return anecdote;
        return anecdote.filter(a => a.content.includes(filter));
    });

    const dispatch = useDispatch();

    const sorted = anecdotes.sort((a, b) => b.votes - a.votes);

    const vote = (id) => {
        dispatch(upVoteAnecdote(id));
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;