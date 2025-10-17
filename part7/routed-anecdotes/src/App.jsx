import { useState } from 'react';
import AnecdoteList from './components/AnecdoteList.jsx';
import About from './components/About.jsx';
import CreateNew from './components/CreateNew.jsx';
import Menu from './components/Menu.jsx';
import Footer from './components/Footer.jsx';
import Anecdote from './components/Anecdote.jsx';
import Notification from './components/Notification.jsx';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { useNotification } from './hooks/index.js';

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ]);
    const { message, type, pushNotification } = useNotification();

    const match = useMatch('/anecdotes/:id');
    const anecdote = match
        ? anecdotes.find(a => a.id === Number(match.params.id))
        : null;

    const navigate = useNavigate();

    const addNew = (anecdote) => {
        if (!anecdote.content || !anecdote.author || !anecdote.info) {
            pushNotification('all fields must be filled out', 'error');
            return;
        }

        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));

        navigate('/');

        pushNotification(`a new anecdote '${anecdote.content}' has been created!`, 'success');
    };

    const anecdoteById = (id) => {
        anecdotes.find(a => a.id === id);
    };

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        };

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
    };

    return (
        <div>
            <div>
                <h1>Software anecdotes</h1>
                <Menu />
            </div>

            <Notification message={message} type={type}/>

            <Routes>
                <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path ='/about' element={<About />} />
                <Route path ='/create' element={<CreateNew addNew={addNew} />} />
                <Route path ='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
            </Routes>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default App;
