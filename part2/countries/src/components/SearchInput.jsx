const SearchInput = ({ search, setSearch }) => {
    return (
        <div>
            <label>Look for a country: </label>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchInput;