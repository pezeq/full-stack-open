const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            <label>Filter shown with: </label>
            <input 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
            />
        </div>
    );
};

export default Filter;