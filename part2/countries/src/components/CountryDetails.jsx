import {useEffect, useState} from "react";
import axios from "axios";

const CountryDetails = ({ filtered }) => {
    const { name, capital, area, languages, flags } = filtered.country;
    const languagesList = Object.values(languages);

    const [openWeather, setOpenWeather] = useState(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_API_KEY;
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`)
            .then(response => {
                setOpenWeather(response.data);
            })
            .catch(err => {
                console.error(`Failed to fetch ${capital} weather:`, err);
            });
    }, [capital]);

    if (!openWeather) return null;

    console.log('Rendered weather:', openWeather);

    const { main, wind, weather } = openWeather;
    const celsius = (main.temp - 273.15).toFixed(2);
    const iconURL = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div>
            <h1>{name.common}</h1>
            <p>Capital: {capital}
                <br/>
                Area: {area}</p>
            <h2>Languages</h2>
            <ul>
                {languagesList.map(l =>
                    <li key={l}>{l}</li>)}
            </ul>
            <img
                src={flags.svg}
                alt={flags.alt}
                height={128}
            />
            <h2>Weather in {`${capital}`}</h2>
            <p>Temperature {celsius}º Celsius </p>
            <img
                src={iconURL}
                alt={weather.description}
            />
            <p>Wind {wind.speed} m/s</p>
        </div>
    );
}

export default CountryDetails;