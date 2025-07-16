import { useState } from 'react';
import personsService from '../services/persons';

const Form = ({ persons, setPersons, pushAlert }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNameChange = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNewNumber(e.target.value);

    const resetForm = () => {
        setNewName('');
        setNewNumber('');
    };

    const validateInput = () => {
        if (!newName.trim() || !newNumber.trim()) {
            alert("Name and number can't be empty.")
            return false;
        }
        return true;
    };

    const updateExistingPerson = (existingPerson) => {
        const confirmed = window.confirm(
            `${newName} is already added to Phonebook. Replace the old number with a new one?`
        );

        if (!confirmed) return;

        const updatedPerson = { ...existingPerson, number: newNumber };

        personsService
            .update(existingPerson.id, updatedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person =>
                    person.id === returnedPerson.id ? returnedPerson : person
                ));
                resetForm();
                pushAlert(`Updated '${existingPerson.name}' with success`, "success");
            })
            .catch(error => {
                console.error('Failed to update person:', error.message);
                pushAlert(`Failed to update '${existingPerson.name}'`, "error");
            });

        //return;
    };

    const createNewPerson = () => {
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        personsService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                resetForm();
                pushAlert(`Created ${newPerson.name} with success`, "success");
        })
        .catch(error => {
            console.error('Failed to create new person:', error);
            pushAlert(`Failed to create new ${newPerson.name}`, "error");
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateInput()) return;
    
        const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
        
        if (existingPerson) {
            updateExistingPerson(existingPerson);
        } else {
            createNewPerson();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                Number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default Form;