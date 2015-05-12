$(document).ready(function () {
    $('#createMedicationBtn').click( function(event){
        event.preventDefault();
        var payload = {
            medname: $('#medname').val()
        };

        $.ajax({
            url: $("#create_medication_form").attr("action"),
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