$(document).ready(function () {
    $('#createDoctorBtn').click( function(event){
        event.preventDefault();
        var payload = {
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            specialty: $('#specialty').val()
        };

        $.ajax({
            url: $("#create_doctor_form").attr("action"),
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
