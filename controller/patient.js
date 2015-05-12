var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all students in a <table> */
router.get('/home', function (req, res) {
    db.GetAllPatients(function (err, result) {
            if (err) throw err;
            res.render('displayPatientHome.ejs', {rs: result});
        }
    );
});

/* View all students in a <table> */
router.get('/all', function (req, res) {
    db.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayStudentsTable.ejs', {rs: result});
        }
    );
});

/* View a single students information */

/*router.get('/', function (req, res) {
    if(req.query.patientid == null) {
        res.redirect('/partient/all');
    }
    else {
        db.GetPatientByID(req.query.patientid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayPatientInfo.ejs', {rs: result, patient: req.query.patient});
            }
        );
    }
});
*/


router.get('/', function (req, res) {
    if(req.query.patientid == null) {
        res.redirect('/partient/all');
    }
    else {
        db.GetPatientInformationByID(req.query.patientid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayPatientInfo.ejs', {rs: result, patient: req.query.patient});
            }
        );
    }
});


// Create Student Form
router.get('/create', function(req, res){
    res.render('createPatientForm.ejs', {action: '/patient/create'});
});

// Save Patient information
router.post('/create', function (req, res) {
    db.InsertPatient( req.body, function (err, presult) {
            if (err) {
                throw err;
            }
           // console.log(result);
            db.InsertEmergencyContact(req.body, presult.insertId, function (err, eresult) {
                if (err) {
                    throw err;
                }
                if(typeof presult.insertId !== 'undefined') {
                    db.GetPatientByID(presult.insertId, function(err, result){
                        console.log(' ');
                        console.log(' ');
                        console.log(' ');
                        console.log(' ');
                        console.log('GET PATIENT BY ID NEEDS TO GET EMERGENCY CONTACT INFORMATION TOO BUT PATIENT ID ');
                        console.log(' here');

                        res.render('displayPatientInfoSnippet.ejs', {rsPatient: result, rsContact: eresult, patientid: result.insertId});

                    });
                }
                else {
                    res.send('Patient was not inserted.');
                }
            });
        }
    );
});

// Delete Patient
router.get('/delete/', function (req, res) {
    console.log(req.query.patientid);
    if(req.query.patientid == null) {
        res.redirect('/patient/all');
    }
    else {
        db.DeletePatient(req.query.patientid, function (err, result) {
            if (err) throw err;
            res.redirect('/patient/home');
        });
    }
});

module.exports = router;

