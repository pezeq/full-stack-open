import { useState } from 'react';
import { useField, useCountry } from './hooks/index';
import Country from './components/Country';

const App = () => {
    const { reset: resetInput, ...inputText } = useField('text');
    const [name, setName] = useState('');
    const country = useCountry(name);

    const fetchCountry = (e) => {
        e.preventDefault();
        setName(inputText.value);
        resetInput();
    };

    return (
        <div>
            <form onSubmit={fetchCountry}>
                <input {...inputText}/>
                <button>find</button>
            </form>
            <Country country={country} />
        </div>
    );
};

export default App;