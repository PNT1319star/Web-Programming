<?php
//Validate functions : kiểm tra giá trị x, y, r có nằm trong giá trị xác định?
function validateX($xVal) {
    return isset($xVal);
}

function validateY($yVal) {
    $Y_MIN = -5;
    $Y_MAX = 5;

    if(!isset($yVal)) return false;
    $yNumber = str_replace(',', '.', $yVal);
    
    return is_numeric($yNumber) && $yNumber >= $Y_MIN && $yNumber <= $Y_MAX;
}

function validateR($rVal) {
    return isset($rVal);
}

function validateForm($xVal, $yVal, $rVal) {
    return validateX($xVal) && validateY($yVal) && validateR($rVal);
} 

//Hit check functions : kiểm tra xem điểm rơi có trong vùng màu xanh?
function checkTriangle($xVal, $yVal, $rVal) {
    return $xVal<=0 && $yVal>=0 && $yVal <= $xVal + $rVal; 
}

function checkCircle($xVal, $yVal, $rVal) {
    return $xVal <= 0 && $yVal <= 0 && sqrt($xVal*$xVal + $yVal * $yVal) <= $rVal;
}

function checkRectangle($xVal, $yVal, $rVal) {
    return $xVal >=0 && $yVal <= 0 && xVal <= $rVal && $yVal <= $rVal/2;
}

function checkHit($xVal, $yVal, $rVal) {
    return checkTriangle($xVal, $yVal, $rVal) || checkRectangle($xVal, $yVal, $rVal) || checkCircle($xVal, $yVal, $rVal);
}







