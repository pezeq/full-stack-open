const express = require('express');
const morgan = require('morgan');
let { persons } = require('./db');
const { getInfo, findPersonById, createPerson } = require('./utils/methods');
const { respondBadReq, respondNotFound } = require('./utils/responses');
const cors = require('cors');

const app = express();

app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());

console.log('Fetching persons:', persons);

app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>');
});

app.get('/info', (req, res) => {
    const info = getInfo(persons);
    console.log('Fetching info:', info);

    res.send(`
        <p>Phonebook has info for ${info.contacts} people</p>
        <p>${info.date}</p>`
    );
});

app.get('/api/persons', (req, res) => {
    res.status(200).json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const person = findPersonById(req, persons);
    if (!person) {
        respondNotFound(res, 'Person does not exist');
        return;
    }

    res.status(200).json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const person = findPersonById(req, persons);
    if (!person) {
        respondNotFound(res, 'Person does not exist');
        return;
    }

    persons = persons.filter(p => p.id !== person.id);

    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;

    if (!name.trim() || !number.trim()) {
        respondBadReq(res, 'Name or number is missing');
        return;
    }

    const isNameNotUnique = persons.find(p => p.name === name);
    if (isNameNotUnique) {
        respondBadReq(res, 'Name must be unique');
        return;
    }

    const person = createPerson(name, number);
    persons = persons.concat(person);

    res.status(201).json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});