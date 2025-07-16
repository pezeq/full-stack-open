import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Display from "./components/Display.jsx";
import SearchInput from "./components/SearchInput.jsx";

const App = () => {
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                console.log(response.data);
                setCountries(response.data);
            })
            .catch(err => {
                console.error('Failed to fetch countries:', err);
            });
    }, []);

    const filtered = useMemo(() => {
        if (!search) return null;

        const matches = countries.filter(c => {
            const query = search.toLowerCase();
            const name = c.name.common.toLowerCase();
            return name.includes(query);
        });

        if (matches.length > 10) {
            return { type: 'many' };
        } else if (matches.length === 1) {
            return { type: 'detailed', country: matches[0] };
        } else {
            return { type: 'list', names: matches.map(c => c.name.common) };
        }
    }, [search, countries]);

    return (
      <main>
          <SearchInput
            search={search}
            setSearch={setSearch}
          />
          <Display
              filtered={filtered}
              setSearch={setSearch}
          />
      </main>
    );
};

export default App;