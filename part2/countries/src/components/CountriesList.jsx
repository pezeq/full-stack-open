const CountriesList = ({ filtered, setSearch }) => (
    <ul>
        {filtered.names.map(name => {
            return <li key={name}>
                {name}
                <button onClick={() => {
                    setSearch(name);
                }}>Show</button>
            </li>
        })}
    </ul>
);

export default CountriesList;