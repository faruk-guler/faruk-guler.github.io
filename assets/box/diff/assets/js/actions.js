function compare() {

    if ($('#original').val() == '' || $('#modified').val() == '') {
        alert('UNABLE TO COMPARE')
        return;
    }

    var dataPost = {
        "original": $('#original').val(),
        "modified": $('#modified').val()
    };
    var dataString = JSON.stringify(dataPost);

    $.ajax({
        url: 'compare.php',
        data: {
            data: dataString
        },
        type: 'POST',
        success: function(response) {
            $("#original").val(response);
        }
    });
}

function clearText() {
    $('#original').val('');
    $('#modified').val('');
}