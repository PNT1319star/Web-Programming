<?php
function validateX($xVal) {
    return isset($xVal);
}

function validateY($yVal) {
    $Y_MIN = -5;
    $Y_MAX = 5;

    if(!isset($yVal)) return false;
    $yNumber = str_replace(',', '.', $yVal);4
    return is_numeric($yNumber) && $yNumber >= $Y_MIN && $yNumber <= $Y_MAX;
}

