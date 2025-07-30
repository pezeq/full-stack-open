require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { respondBadReq, respondNotFound } = require('./utils/responses');
const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>');
});

app.get('/info', (req, res, next) => {
    Person.find({})
        .then(result => {
            res.send(`
                <p>Phonebook has info for ${result.length} people</p>
                <p>${new Date().toString()}</p>
            `);
        })
        .catch(err => next(err));
});

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons);
        });
});

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                respondNotFound(res, 'Person does not exist');
            }
        })
        .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(deletedPerson => {
            if (deletedPerson) {
                res.status(204).end();
            } else {
                respondNotFound(res, 'Person does not exist');
            }
        })
        .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body;

    Person.findOne({ name })
        .then(existingPerson => {
            if (existingPerson) {
                return respondBadReq(res, 'Name must be unique');
            }

            const person = new Person({
                name: name,
                number: number
            });
            console.log('New Person:', person);

            return person.save()
                .then(savedPerson => {
                    res.status(201).json(savedPerson);
                });
        })
        .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
    const { number } = req.body;

    Person.findById(req.params.id)
        .then(person => {
            if (!person) {
                return respondNotFound(res, 'Person does not exist');
            }

            person.number = number;

            return person.save()
                .then(savedPerson => {
                    res.json(savedPerson);
                });
        })
        .catch(err => next(err));
});

const unknownEndpoint = (req, res) => {
    respondNotFound(res, 'Unknown Endpoint');
};
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    console.log(err.message);

    if (err.name === 'CastError') {
        return respondBadReq(res, 'Malformatted ID');
    } else if (err.name === 'ValidationError') {
        return respondBadReq(res, err.message);
    }

    next(err);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});