$(document).ready(function () {
    $('#createPatientBtn').click( function(event){
        event.preventDefault();
        var payload = {
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            SSN: $('#SSN').val(),
            efirst: $('#efirst').val(),
            elast: $('#elast').val(),
            relationship: $('#relationship').val(),
            phonenumber: $('#phonenumber').val(),
            SSN2: $('#SSN2').val(),
            SSN3: $('#SSN3').val(),
            sex: $('#sex').val()

        };

        $.ajax({
            url: $("#create_patient_form").attr("action"),
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            complete: function(data) {
                console.log(data.responseText);
                $('#output').html(data.responseText);
                $('#output').show();
            }
        });
    });
});
