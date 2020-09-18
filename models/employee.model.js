const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: 'This Field Is Required'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});

employeeSchema.path('email').validate((val)=>{
    let emailRejex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRejex.test(val);

}, 'Invalid Email');


mongoose.model('employee', employeeSchema);

