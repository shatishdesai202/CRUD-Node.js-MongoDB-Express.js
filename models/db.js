const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/EmployeeDB', {useNewUrlParser: true}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDb Connection Succeeded');
    }
});

require('./employee.model');