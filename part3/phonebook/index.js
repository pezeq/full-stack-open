require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { getInfo, findPersonById, createPerson } = require('./utils/helpers');
const { respondBadReq, respondNotFound } = require('./utils/responses');
const Person = require('./models/person');
//let { persons } = require('./db');

const app = express();

app.use(express.json());
app.use(express.static('dist'));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

//console.log('Fetching persons:', persons);

app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>');
});

app.get('/info', (req, res, next) => {
    Person.find({}).then(result => {
        res.send(`
            <p>Phonebook has info for ${result.length} people</p>
            <p>${new Date().toString()}</p>
        `);
    })
    .catch(err => next(err));
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then(p => {
        res.json(p);
    });
});

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(p => {
            if (p) {
                res.json(p);
            } else {
                respondNotFound(res, "Person does not exist");
            }
        })
        .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(p => {
            if (p) {
                res.status(204).end();
            } else {
                respondNotFound(res, "Person does not exist");
            }
        })
        .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body;

    // if (!name.trim() || !number.trim()) {
    //     respondBadReq(res, 'Name or number is missing');
    //     return;
    // }

    Person.find({}).then(p => {
        const isNameNotUnique = p.find(person => person.name === name);
        if (isNameNotUnique) {
            respondBadReq(res, 'Name must be unique');
            return;
        }

        const person = new Person ({
            name: name,
            number: number
        });
        console.log('New Person:', person);

        person.save()
            .then(savedPerson => {
            res.json(savedPerson);
            })
            .catch(err => next(err));
    });


});

app.put('/api/persons/:id', (req, res, next) => {
    console.log('Req', req.body);
    const { number } = req.body;

    Person.findById(req.params.id)
        .then(p => {
            if (!p) respondNotFound(res, "Person does not exist");

            p.number = number;

            return p.save().then(savedPerson => {
                res.json(savedPerson);
            });
        })
        .catch(err => next(err));
})

const unknownEndpoint = (req, res) => {
    respondNotFound(res, "Unknown Endpoint")
}
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    console.log(err.message);

    if (err.name === 'CastError') {
        respondBadReq(res, "Malformatted ID");
    } else if (err.name === 'ValidationError') {
        respondBadReq(res, err.message)
    }

    next(err);
}
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});