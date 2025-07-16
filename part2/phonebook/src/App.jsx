import { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import Alert from './components/Alert';
import { useAlert } from './hooks/useAlert';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState('');
    const { alertMsg, alertType, pushAlert } = useAlert();

    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            })
            .catch(error => {
                console.error('Failed to fetch persons:', error);
                pushAlert('Failed to fetch persons', "error");
            })
    }, []);

    return (
        <main>
            <h2>Phonebook</h2>
            <Alert
                message={alertMsg}
                type={alertType}
            />
            <br />
            <Filter
                filter={filter}
                setFilter={setFilter}
            />
            <h2>Add a new Person</h2>
            <Form
                persons={persons}
                setPersons={setPersons}
                pushAlert={pushAlert}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                setPersons={setPersons}
                filter={filter}
                pushAlert={pushAlert}
            />
        </main>
    );
};

export default App;