var express = require('express');
var router  = express.Router();
var db   = require('../models/db');

/* View all students in a <table> */
router.get('/home', function (req, res) {
 //   db.GetAllMedications(function (err, result) {
   //         if (err) throw err;
     //       res.render('displayMedicationHome.ejs', {rs: result});
       // }
   // );

    db.GetAllMedications(function (err, medicationresult) {
        if (err) throw err;
        db.GetAllDoctors(function (err, doctorresult) {
            if (err) throw err;
            db.GetAllPatients(function (err, patientresult) {
                if (err) throw err;
                res.render('test.ejs', {rsMedication: medicationresult,
                    rsDoctor: doctorresult,
                    rsPatient: patientresult,
                    action: '/medication/prescription/create'});

            })
        });
    });

});


router.post('/prescription/create', function (req, res) {
    console.log("req.body");
    console.log(req.body);
    db.InsertPrescription( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.GetPrescriptionByID(result.insertId, function(err, result){
                    console.log(result);

                    res.render('displayPrescriptionInfoSnippet.ejs', {rs: result, prescid: result.insertId});

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
        res.redirect('/medication/all');
    }
    else {
        db.GetDoctorByID(req.query.doctorid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayDoctorInfo.ejs', {rs: result, doctorid: req.query.doctorid});
            }
        );
    }
});

// Create Doctor Form
router.get('/create', function(req, res){
    res.render('createMedicationForm.ejs', {action: '/medication/create'});
});

// Save Doctor information
router.post('/create', function (req, res) {
    db.InsertMedication( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.GetMedicationByID(result.insertId, function(err, result){

                    res.render('displayMedicationInfoSnippet.ejs', {rs: result, medicationid: result.insertId});

                });
            }
            else {
                res.send('Medication was not inserted.');
            }
        }
    );
});

module.exports = router;