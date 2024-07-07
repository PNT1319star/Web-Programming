$(function() {
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function validateX() {
        if($('.x-radio').is(':checked')) {
            $('.xbox-label').removeClass('box-error');
            return true;
        } else {
            $('.xbox-label').addClass('box-error');
            return false;
        }
    }

    function validateY() {
        const Y_MIN = -5;
        const Y_MAX = 5;

        let yField = $('#y-textinput');
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
        if ($('.r-checkbox').is(':checked')) {
            $('.rbox-label').removeClass('box-error') 
            return true;
        } else {
            $('.rbox-label').addClass('box-error');
            return false;
        }
    }

    function validateForm() {
        return validateX & validateY & validateR;
    }

    $('#input-form').on('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) return;
        $.ajax({
            url: 'php/main.php',
            method: 'POST',
            data: $
        })
    }
})