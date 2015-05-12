var express = require('express');
var router  = express.Router();
var db   = require('../models/db');

/* View all students in a <table> */
router.get('/home', function (req, res) {
    db.GetAllDoctors(function (err, result) {
            if (err) throw err;
            res.render('displayDoctorHome.ejs', {rs: result});
        }
    );
});

/* View a single doctor's information */
router.get('/', function (req, res) {
    if(req.query.doctorid == null) {
        res.redirect('/doctor/all');
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
    res.render('createDoctorForm.ejs', {action: '/doctor/create'});
});

// Save Doctor information
router.post('/create', function (req, res) {
    db.InsertDoctor( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.GetDoctorByID(result.insertId, function(err, result){
                   // if (err) throw err;
                    res.render('displayDoctorInfoSnippet.ejs', {rs: result, doctorid: result.insertId});

                });
            }
            else {
                res.send('Doctor was not inserted.');
            }
        }
    );
});

// Create Doctor Form
router.get('/edit/', function(req, res){
    console.log(req.query);
    console.log(req.query.doctorid);

    db.GetDoctorByID(req.query.doctorid, function (err, result) {
        if (err) throw err;
            //console.log(result);
        res.render('editDoctorForm.ejs', {rs: result, action: '/doctor/edit'});
    }
    );


});

// Save Doctor information
router.post('/edit', function (req, res) {
    db.UpdateDoctor( req.body, function (err, result) {
            if (err) {
                throw err;
            }

            db.GetDoctorByID(req.body.doctorid, function(err, result){

                res.render('displayDoctorInfoSnippet.ejs', {rs: result, doctorid: req.body.doctorid});

            });
        }
    );
});



// Delete Doctor
router.get('/delete/', function (req, res) {
    console.log(req.query.doctorid);
    if(req.query.doctorid == null) {
        res.redirect('/doctor/all');
    }
    else {
        db.DeleteDoctor(req.query.doctorid, function (err, result) {
            if (err) throw err;
            res.redirect('/doctor/home');
        });
    }
});

module.exports = router;