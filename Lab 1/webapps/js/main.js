$(function() {
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function validateX() {
        if($('.x-radio').is(':checked')) {
            $('.box-label').removeClass('box-error');
            return true;
        } else {
            $('.box-label').addClass('box-error');
            return false;
        }
    }

    function validateY() {
        const Y_MIN = -5;
        const Y_MAX = 5;

        let yField = $('#y-text-input');
        let yNumber = yField.val().replace(',', '.');

        if (isNumeric(yNumber) && yNumber >= Y_MIN && yNumber <= Y_MAX) {
            yField.removeClass('text-error');
            return true;
        } else {
            yField.addClass('text-error');
            return false;
        }
    }

    function validateR() {
        if ($('.r-radio').is(':checked')) {
            $('.box-label').removeClass('box-error')
            return true;
        } else {
            $('.box-label').addClass('box-error');
            return false;
        }
    }

    function validateForm() {
        return validateX && validateY && validateR;
    }

    $('#input-form').on('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) return;
        $.ajax({
            url: 'php/main.php',
            method: 'POST',
            data: $(this).serialize() + '&timezone=' + new Date().getTimezoneOffset(),
            dataType: "json",
            beforeSend: function() {
                $('.button').attr('disabled', 'disabled');
            },
            success: function(data) {
                $('.button').attr('disabled', false);
                let newRow;
                if (data.validate) {
                    newRow = '<tr>';
                    newRow += '<td>' + data.xval + '</td>';
                    newRow += '<td>' + data.yval + '</td>';
                    newRow += '<td>' + data.rval + '</td>';
                    newRow += '<td>' + data.curtime + '</td>';
                    newRow += '<td>' + data.exectime + '</td>';
                    newRow += '<td>' + data.hitres + '</td>';
                    $('#result-table').append(newRow);
                }
            }
        });
    });
});