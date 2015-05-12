$(document).ready(function () {
    $('#editOperationBtn').click( function(){
        var payload = {
            operationid: $('#operationid').val(),
            doctor: $('#doctor').val(),
            patient: $('#patient').val(),
            date: $('#date').val(),
            time: $('#time').val(),
            description: $('#description').val()
        };

        $.ajax({
            url: $("#edit_operation_form").attr("action"),
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