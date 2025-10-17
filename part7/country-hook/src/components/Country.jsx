const Country = ({ country }) => {
    if (!country) return null;
    if (!country.found) return <div>Not Found...</div>;

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>
        </div>
    );
};

export default Country;