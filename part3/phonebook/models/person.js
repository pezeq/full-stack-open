const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Unnable to connect to MongoDB', err.message);
    });

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: [3, 'Must be at least 3 characters long'],
      required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /\d{2}-\^[0-9]*$/.test(v) || /\d{3}-\^[0-9]*$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    }
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);