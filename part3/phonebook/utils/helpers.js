const Person = require('../models/person');

const getInfo = (persons) => {
    const info = {
        contacts: persons.length,
        date: new Date().toString()
    };
    console.log('Fetching info:', info);

    return info;
}

const findPersonById = (req, persons) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    console.log('Fetching person:', person);

    return person;
}

const createPerson = (name, number) => {
    const person = new Person ({
        name: name,
        number: number
    })
    console.log('New Person:', person);

    return person;
}

module.exports = {
    getInfo,
    findPersonById,
    createPerson
}