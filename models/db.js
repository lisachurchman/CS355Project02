var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

//exports.GetAll = function(callback) {
//    connection.query('select * from Student',
//        function (err, result) {
//            if(err) {
//                console.log(err);
//                callback(true);
//                return;
//            }
//          //  console.log(result);
//            callback(false, result);
//        }
//    );
//}

//exports.GetAllView = function(callback) {
//    console.log("You must create the StudentsView MySQL VIEW for the sql statement below to work.");
//    // To create the StudentsView run the CREATE VIEW query below via the mysql client or mysql workbench.
//    // CREATE VIEW StudentsView AS SELECT * FROM Students;
//    connection.query('select Student_number, Name from StudentsView',
//        function (err, result) {
//            if(err) {
//                console.log(err);
//                callback(true);
//                return;
//            }
//            callback(false, result);
//        }
//    );
//}

//
//exports.GetByID = function(studentid, callback) {
//    console.log('studentid');
//    console.log(studentid);
//    var query = 'select * from Student WHERE Student_number=' + studentid;
//    console.log(query);
//    connection.query(query,
//        function (err, result) {
//            if(err) {
//                console.log(err);
//                callback(true);
//                return;
//            }
//            callback(false, result);
//        }
//    );
//}

//exports.Insert = function(student_info, callback) {
//    console.log(student_info);
//    var query = 'INSERT INTO Student (Name, Major, Location) VALUES (\'' + student_info.name + '\', \'' + student_info.major + '\', \'' + student_info.location + '\')';
//    console.log(query);
//    connection.query(query,
//        function (err, result) {
//            if(err) {
//                console.log(err);
//                callback(true);
//                return
//            }
//            callback(false, result);
//        }
//    );
//}










exports.GetAllDoctors = function(callback) {
    connection.query('select * from Doctor',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetDoctorByID = function(doctorid, callback) {
    console.log(doctorid);
    var query = 'select * from Doctor WHERE DoctorID=' + doctorid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.InsertDoctor = function(doctor_info, callback) {
    console.log(doctor_info);
    var query = 'INSERT INTO Doctor (FirstName, LastName, Specialty) VALUES (\'' + doctor_info.fname + '\', \'' + doctor_info.lname + '\', \'' + doctor_info.specialty + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );

}

exports.UpdateDoctor = function(doctor_info, callback) {
    var query = 'UPDATE Doctor SET FirstName =\'' + doctor_info.fname
        + '\', LastName = \'' + doctor_info.lname
        + '\', Specialty =\'' + doctor_info.specialty
        + '\' WHERE DoctorID=' + doctor_info.doctorid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

exports.DeleteDoctor = function(doctorid, callback) {
    console.log(doctorid);
    var query = 'DELETE FROM Doctor WHERE DoctorID =' + doctorid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}





// PATIENTS
exports.GetAllPatients = function(callback) {
    connection.query('select * from Patient',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
           // console.log(result);
            callback(false, result);
        }
    );
}

// get all patients
exports.GetAllPatientsView = function(callback) {
    console.log("You must create the StudentsView MySQL VIEW for the sql statement below to work.");
    // To create the StudentsView run the CREATE VIEW query below via the mysql client or mysql workbench.
    // CREATE VIEW StudentsView AS SELECT * FROM Students;
    connection.query('select Student_number, Name from StudentsView',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


exports.GetPatientByID = function(patientid, callback) {
    console.log(patientid);
    var query = 'select * from Patient WHERE PatientID=' + patientid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetPatientInformationByID = function(patientid, callback) {
    console.log(patientid);
    var query = 'SELECT * FROM (AllPatientInformation) WHERE PatientID = ' + patientid;
    //var query = 'select * from Patient WHERE PatientID=' + patientid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.InsertPatient = function(patient_info, callback) {
    console.log(patient_info);
    var query = 'INSERT INTO Patient (FirstName, LastName, Sex, SSN1, SSN2, SSN3) VALUES (\''
        + patient_info.fname + '\', \''
        + patient_info.lname + '\', \''
        + patient_info.sex + '\', \''
        + patient_info.SSN + '\', \''
        + patient_info.SSN2 + '\', \''
        + patient_info.SSN3 + '\')';
    console.log(query);

    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}
exports.InsertEmergencyContact = function(contact_info, patientid, callback) {
    console.log(contact_info);
    var query = 'INSERT INTO EmergencyContact (FirstName, LastName, Relationship, PhoneNumber, PatientID) VALUES (\''
        + contact_info.efirst + '\', \''
        + contact_info.elast + '\', \''
        + contact_info.relationship + '\', \''
        + contact_info.phonenumber + '\', '
        + patientid + ');';
    console.log(query);

    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

// delete patient and all medications and operations associated with it
exports.DeletePatient = function(patientid, callback) {
    console.log(patientid);
    var query = 'DELETE FROM Patient WHERE PatientID =' + patientid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}




//Medication
exports.GetAllMedications = function(callback) {
    connection.query('select * from Medication',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}



exports.GetMedicationByID = function(medicationid, callback) {
    console.log(medicationid);
    var query = 'select * from Medication WHERE MedicationID=' + medicationid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.InsertMedication = function(med_info, callback) {
    console.log(med_info);
    var query = 'INSERT INTO Medication (MedicationName) VALUES (\'' + med_info.medname + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}


exports.GetPrescriptionByID = function(prescriptionid, callback) {
    console.log(prescriptionid);
    //procedure
    var query = 'call PrescriptionInformationByPrescID(' + prescriptionid + ');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.InsertPrescription = function(presc_info, callback) {
    console.log(presc_info);
    var query = 'INSERT INTO MedicationPrescription (MedicationID, DoctorID, PatientID) VALUES ('
        + presc_info.medication + ', '
        + presc_info.doctor + ', '
        + presc_info.patient + ')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}




//SELECT * FROM OperationView;
exports.GetAllOperations = function(callback) {
    connection.query('SELECT * FROM OperationView;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
           // console.log(result);
            callback(false, result);
        }
    );
}


exports.InsertOperation = function(operation_info, callback) {
    console.log(operation_info);
    var query = 'INSERT INTO Operation (Date, Time, DoctorID, PatientID, Description) VALUES (\''
        + operation_info.date + '\', \''
        + operation_info.time + '\', '
        + operation_info.doctor + ', '
        + operation_info.patient + ', \''
        + operation_info.description + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}



exports.GetOperationByID = function(operationid, callback) {
    console.log(operationid);
    var query = 'SELECT * FROM OperationView WHERE OperationID =' + operationid +';';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


exports.UpdateOperation = function(operation_info, callback) {
    console.log(operation_info);
    var query = 'UPDATE Operation SET Date = \''+ operation_info.date
        + '\', Time = \'' + operation_info.time
        + '\', DoctorID = ' + operation_info.doctor
        + ', PatientID = '+ operation_info.patient
        + ', Description = \'' + operation_info.description
        + '\' WHERE OperationID=' + operation_info.operationid;

    console.log(query);

    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}





// delete patient and all medications and operations associated with it
exports.DeleteOperation = function(operationid, callback) {
    console.log(operationid);
    var query = 'DELETE FROM Operation WHERE OperationID =' + operationid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}


exports.TotalPatients = function(callback) {
    var query = 'SELECT COUNT(PatientID) TotalPatients FROM Patient; ';
    console.log(query);
    connection.query (query,
        function (err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false,result);
        });
}
