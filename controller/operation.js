var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all students in a <table> */
router.get('/home', function (req, res) {
    db.GetAllOperations(function (err, result) {
            if (err) throw err;
            res.render('displayOperationHome.ejs', {rs: result});
        }
    );
});

// create a new operation
router.get('/create', function (req, res) {
        db.GetAllDoctors(function (err, doctorresult) {
            if (err) throw err;
            db.GetAllPatients(function (err, patientresult) {
                if (err) throw err;
                res.render('createOperationForm.ejs', {
                    rsDoctor: doctorresult,
                    rsPatient: patientresult,
                    action: '/operation/create'});

            })
        });

});


router.post('/create', function (req, res) {
    console.log("req.body");
    console.log(req.body);
    db.InsertOperation( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.GetOperationByID(result.insertId, function(err, result){
                    console.log(result);

                    res.render('displayOperationInfoSnippet.ejs', {rs: result, operationid: result.insertId});

                });
            }
            else {
                res.send('Medication was not inserted.');
            }
        }
    );
});



/* View a single doctor's information */
router.get('/', function (req, res) {
    if(req.query.doctorid == null) {
        res.redirect('/operation/all');
    }
    else {
        db.GetDoctorByID(req.query.doctorid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayOperationInfo.ejs', {rs: result, operationid: req.query.operationid});
            }
        );
    }
});

// Delete Patient
router.get('/delete/', function (req, res) {
    console.log(req.query.operationid);
    if(req.query.operationid == null) {
        res.redirect('/operation/all');
    }
    else {
        db.DeleteOperation(req.query.operationid, function (err, result) {
            if (err) throw err;
            res.redirect('/operation/home');
        });
    }
});

// edit operation
router.get('/edit/', function(req, res){
    console.log(req.query);
    console.log(req.query.operationid);

    db.GetAllDoctors(function (err, doctorresult) {
        if (err) throw err;
        db.GetAllPatients(function (err, patientresult) {
            if (err) throw err;
            db.GetOperationByID(req.query.operationid, function (err, operationresult) {
                    if (err) throw err;
                    //console.log(result);
                   // console.log('operationrestult');
                    //console.log(operationresult);
                    res.render('editOperationForm.ejs', {
                        op:operationresult,
                        rsDoctor: doctorresult,
                        rsPatient: patientresult,
                        action: '/operation/edit'});
                        }
            );

        })
    });


});

// Save operation information
router.post('/edit', function (req, res) {
    console.log('seconf edit');
    db.UpdateOperation( req.body, function (err, result) {
            if (err) {
                throw err;
            }

            db.GetOperationByID(req.body.operationid, function(err, result){

                res.render('displayOperationInfoSnippet.ejs', {rs: result, operationid: req.body.operationid});

            });
        }
    );
});


module.exports = router;