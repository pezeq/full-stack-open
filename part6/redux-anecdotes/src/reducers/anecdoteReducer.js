import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../../services/anecdoteService';

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        updateAnecdote(state, action) {
            const { id } = action.payload;
            return state.map(a => a.id !== id ? a : action.payload);
        },
        appendAnecdotes(state, action) {
            state.push(action.payload);
        },
        setAnecdotes(state, action) {
            return action.payload;
        }
    }
});

export const {
    updateAnecdote,
    appendAnecdotes,
    setAnecdotes,
} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createNewAnecdote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(anecdote);
        dispatch(appendAnecdotes(newAnecdote));
    };
};

export const upVoteAnecdote = (anecdote) => {
    return async (dispatch) => {
        const toBeVoted = {
            ...anecdote,
            votes: anecdote.votes + 1
        };

        const upVotedAnecdote = await anecdoteService.update(toBeVoted);
        dispatch(updateAnecdote(upVotedAnecdote));
    };
};

export default anecdoteSlice.reducer;