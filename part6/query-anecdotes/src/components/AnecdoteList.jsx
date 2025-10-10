import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAll, update } from '../services/anecdoteService.js';
import { useNotificationDispatch, showNotification } from "../NotificationContext.jsx";

const AnecdoteList = () => {
    const queryClient = useQueryClient();
    const dispatch = useNotificationDispatch();

    const votesMutation = useMutation({
        mutationFn: update,
        onSuccess: (anecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== anecdote.id ? a : anecdote));
            showNotification(dispatch, `Anecdote '${anecdote.content}' has been upvoted`);
        },
        onError: () => {
            showNotification(dispatch, 'Something went wrong... Could not upvote anecdote!');
        }
    });

    const result = useQuery({
        queryKey:['anecdotes'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    if (result.isLoading) {
        return <div>loading data...</div>;
    }

    if (result.isError) {
        return <div>anecdote service not available due to problems in server</div>;
    }

    console.log(JSON.parse(JSON.stringify(result.data)));
    const anecdotes = result.data;

    const handleVote = (anecdote) => {
        votesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    };

    const divStyle = {
        marginTop: '10px',
    };

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id} style={divStyle}>
                    <span>{anecdote.content}</span>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;