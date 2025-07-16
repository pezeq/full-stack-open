import CountriesList from "./CountriesList.jsx";
import CountryDetails from "./CountryDetails.jsx";

const Display = ({ filtered, setSearch }) => {
    if (filtered === null) return;

    console.log('Filtered:', filtered)

    if (filtered.type === 'many') {
        return <p>Too many matches...</p>
    }

    if (filtered.type === 'list') {
        return <CountriesList filtered={filtered} setSearch={setSearch} />
    }

    return <CountryDetails filtered={filtered} />
}
export default Display;