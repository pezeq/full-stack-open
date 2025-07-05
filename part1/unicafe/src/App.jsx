import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) return <p>No feedback given</p>;

  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;
  
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={average.toFixed(1)} />
        <StatisticLine text="Positive" value={`${positive.toFixed(1)}%`}/>
      </tbody>
    </table>
  );
};
  
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const HandleGoodClick = () => setGood(good + 1);
  const HandleNeutralClick = () => setNeutral(neutral + 1);
  const HandleBadClick = () => setBad(bad + 1);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={HandleGoodClick} text={"Good"} />
      <Button onClick={HandleNeutralClick} text={"Neutral"} />
      <Button onClick={HandleBadClick} text={"Bad"} />
        
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  );
};

export default App;