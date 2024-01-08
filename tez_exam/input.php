<?php
    function safeme($connect, $var) {
	    $sanitized_value = $connect->real_escape_string($_POST[$var]);
	    $sanitized_value = stripslashes($sanitized_value);
	    $sanitized_value = strip_tags($sanitized_value);
	    return $sanitized_value;
	}

    function clean($var) {
		return !empty(trim($_POST[$var]));
	}
?>