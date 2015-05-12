$(document).ready(function () {
    console.log('create_prescription.js');
    $('#createPrescriptionBtn').click( function(){
        var payload = {
            medication: $('#medication').val(),
            doctor: $('#doctor').val(),
            patient: $('#patient').val()
        };

        $.ajax({
            url: $("#create_prescription_form").attr("action"),
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