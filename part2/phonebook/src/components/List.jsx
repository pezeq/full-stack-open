import personsService from '../services/persons';

const List = ({ person, setPersons, pushAlert }) => {
    const handleDelete = () => {
        const confirmed = window.confirm(`Delete ${person.name}?`);
        if (!confirmed) return;

        personsService
            .remove(person.id)
            .then(returnedPerson => {
                setPersons(prevPersons =>
                     prevPersons.filter(p => p.id !== returnedPerson.id)
                );
                pushAlert(`Deleted '${person.name}' with success`, "success");
            })            
            .catch(error => {
                console.error('Failed to delete person:', error.message);
                pushAlert(`Failed to delete '${person.name}'`, "error");
            });
    };

    return (
        <div>
            {person.name} {person.number} 
            <button onClick={handleDelete}>Delete</button><br />
        </div>
    );
}
export default List;