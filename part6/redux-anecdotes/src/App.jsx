import AnecdoteList from './components/AnecdoteList.jsx';
import AnecdoteForm from './components/AnecdoteForm.jsx';

const App = () => {
    return (
        <main>
            <h2>Anecdotes</h2>
            <AnecdoteList />
            <AnecdoteForm />
        </main>
    );
};

export default App;