$(document).ready(function () {
    $('#createOperationBtn').click( function(){
        var payload = {
            doctor: $('#doctor').val(),
            patient: $('#patient').val(),
            date: $('#date').val(),
            time: $('#time').val(),
            description: $('#description').val()
        };

        $.ajax({
            url: $("#create_operation_form").attr("action"),
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