<?php
	$connect = new mysqli('localhost', 'root', '', 'exam_schedule');
	if($connect->connect_error) die ($connect->connect_error);
?>