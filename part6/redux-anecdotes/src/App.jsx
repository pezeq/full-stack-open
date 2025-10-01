import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAnecdotes } from './reducers/anecdoteReducer';
import anecdoteService from '../services/anecdoteService';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteFilter from './components/AnecdoteFilter';
import Notification from './components/Notification';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        anecdoteService
            .getAll()
            .then(anecdotes => {
                console.log('anecdotes', anecdotes);
                dispatch(setAnecdotes(anecdotes));
            })
            .catch(err => {
                console.error('Error', err.message);
            });
    }, []);

    return (
        <main>
            <h2>Anecdotes</h2>
            <Notification />
            <AnecdoteFilter />
            <AnecdoteList />
            <AnecdoteForm />
        </main>
    );
};

export default App;