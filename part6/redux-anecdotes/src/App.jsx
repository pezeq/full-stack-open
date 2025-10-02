import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteFilter from './components/AnecdoteFilter';
import Notification from './components/Notification';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAnecdotes());
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