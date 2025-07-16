import List from "./List";

const Persons = ({ persons, setPersons, filter, pushAlert }) => {
  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;
  
  return (
    <div>
      {personsToShow.map(p =>
        <List
            key={p.id} person={p}
            setPersons={setPersons}
            pushAlert={pushAlert}
        />
      )}
    </div>
  );
};

export default Persons;