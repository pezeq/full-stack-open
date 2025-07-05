import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const AnecdoteDisplay = ({ title, anecdotes, votes}) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{anecdotes}</p>
      <p>Has {votes} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0);

  const handleNextAnecdote = () => {
    let nextAnecdote;
    do {
      nextAnecdote = Math.floor(Math.random() * anecdotes.length);
    } while (nextAnecdote === selected);
    setSelected(nextAnecdote);
  };

  const [ votes, setVote ] = useState(Array(anecdotes.length).fill(0));

  const handleVotes = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVote(updatedVotes);
  };

  const maxVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(maxVotes);
 
  return (
    <>
      <AnecdoteDisplay 
        title={"Anecdote of the day"} 
        anecdotes={anecdotes[selected]} 
        votes={votes[selected]}
      />

      <Button onClick={handleVotes} text={"Vote"}/>
      <Button onClick={handleNextAnecdote} text={"Next Anecdote"}/>

      <AnecdoteDisplay 
        title={"Anecdote with most votes"} 
        anecdotes={anecdotes[mostVotedIndex]} 
        votes={votes[mostVotedIndex]}
      />
    </>
  );
};

export default App;