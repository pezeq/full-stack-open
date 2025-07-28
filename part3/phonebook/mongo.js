const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Enter the password as argument...');
    process.exit(1);
}

const password = process.argv[2];
const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
    const newPerson = new Person ({
        name: process.argv[3],
        number: process.argv[4],
    });

    newPerson.save().then(() => {
        console.log(`Added ${newPerson.name} number ${newPerson.number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(p);
        })
        mongoose.connection.close();
    });
}