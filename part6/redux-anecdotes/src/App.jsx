import AnecdoteList from './components/AnecdoteList.jsx';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteFilter from './components/AnecdoteFilter.jsx';

const App = () => {
    return (
        <main>
            <h2>Anecdotes</h2>
            <AnecdoteFilter />
            <AnecdoteList />
            <AnecdoteForm />
        </main>
    );
};

export default App;