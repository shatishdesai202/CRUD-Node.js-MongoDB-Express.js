const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Employee = mongoose.model('employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Or Edit"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function updateRecord(req, res) {
    Employee.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err,doc) =>{
        if(!err){
            res.redirect('employee/list');
        }else{
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else{
                console.log('Error during record update : ' + err);
            }
        }
    });
}


function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (err) {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
            }
            console.log("some-mistake is here" + err);
        } else {
            res.redirect('employee/list');
        }
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullname':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/list', (req, res) => {
    // Employee.find((err, doc)=>{
    //     if(!err){
    //         res.render("employee/list", {
    //             list:doc
    //         });
    //     }else{
    //         console.log('mistake in find'+err);
    //     }
    // });

    Employee.find({}).lean().exec((err, doc) => {

        res.render("employee/list", {
            list: doc
        });


        // if (!err) {
        //     res.render("employee/list", {
        //         list: doc
        //     });
        // } else {
        //     console.log('mistake in find' + err);
        // }
    });
});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log('edit');
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc,
                _id: doc._id,
                fullname: doc.fullname,
                email: doc.email,
                mobile: doc.mobile,
                city: doc.city
            });

        } else {
            console.log('error in edit');
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});


module.exports = router;