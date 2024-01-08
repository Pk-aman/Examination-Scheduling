<?php
    date_default_timezone_set('Asia/Kolkata');
    $now = date('Y-m-d H:i:s');
    $today = date('Y-m-d');

    class Exam{
    
    // Department

        function verify_code($code){
            global $connect;
            $sql = " SELECT * FROM department WHERE Dept_code = '$code' ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                return true;
            } return false;
        }

        function create_department($code, $name){
            global $connect;

            if($this->verify_code($code) === true){
                $sql = " UPDATE `department` SET `Dept_name`='$name' WHERE Dept_code = '$code' ";
                if($connect->query($sql)){
                    return ['status' => true, 'msg' => 'Department successfully updated'];
                } else {
                    return ['status' => false, 'msg' => 'Failed to update department'];
                }
            } else {
                $sql = " INSERT INTO `department`(`Dept_code`, `Dept_name`) VALUES ('$code','$name') ";
                if($connect->query($sql)){
                    return ['status' => true, 'msg' => 'Department successfully added'];
                } else {
                    return ['status' => false, 'msg' => 'Failed to add department'];
                }
            }
        }

        function list_department($searchquery){
            global $connect;
            $sql = " SELECT Dept_code as id, Dept_name FROM `department`WHERE Dept_code like '%$searchquery%' ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $array[] = $row;
                } return ['status' => true, 'data' => $array];
            } else {
                return ['status' => false, 'msg' => 'Not found any department.'];
            }
        }

        function department_detail($code){
            global $connect;
            $sql = " SELECT * FROM `department` WHERE Dept_code = '$code' ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                $row = $result->fetch_assoc();
                return ['status' => true, 'data' => $row];
            } else {
                return ['status' => false, 'msg' => 'Not found any detail'];
            }
        }

        function delete_department($code){
            global $connect;
            $sql = " DELETE FROM `department` WHERE Dept_code = '$code' ";
            if($connect->query($sql)){
                return ['status' => true, 'msg' => 'Department successfully deleted'];
            } else {
                return ['status' => false, 'msg' => 'Failed to delete department'];
            }
        }

    // Programme

        function verify_program_code($procode, $deptcode){
            global $connect;
            $sql = " SELECT * FROM `programme` WHERE Dept_code = '$deptcode' AND Programme_code = '$procode' ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                return true;
            } return false;
        }

        function create_program($deptcode, $procode, $name, $semester){
            global $connect;
            if($this->verify_program_code($procode, $deptcode) === true){
                $sql = " UPDATE `programme` SET `Programme_code`='$procode',`Programme_name`='$name',`Number_of_Semester`= $semester,`Dept_code`= '$deptcode'WHERE Programme_code = '$procode' AND Dept_code = '$deptcode'";
                if($connect->query($sql)){
                    return ['status' => true, 'msg' => 'Programme successfully updated.'];
                } else {
                    return ['status' => false, 'msg' => 'Failed to update programme.'];
                }
            } else {
                $sql = " INSERT INTO `programme`(`Programme_code`, `Programme_name`, `Number_of_Semester`, `Dept_code`) VALUES ('$procode','$name','$semester','$deptcode') ";
                if($connect->query($sql)){
                    return ['status' => true, 'msg' => 'Programme successfully created.'];
                } else {
                    return ['status' => false, 'msg' => 'Failed to create programme.'];
                }
            }
        }

        function list_programs($searchquery){
            global $connect;
            $sql = "SELECT id, Programme_code as procode, Programme_name as proname, Number_of_Semester as sem, Dept_code FROM `programme` WHERE Programme_code like '%$searchquery%' ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $array[] = $row;
                } return ['status' => true, 'data' => $array];
            } else {
                return ['status' => false, 'msg' => 'No Record is present Yet!'];
            }
        }

        function list_programs_by_dept($searchdept){
            global $connect;
            $sql = "SELECT id, Programme_code as procode, Programme_name as proname, Number_of_Semester as sem, Dept_code FROM `programme` WHERE Dept_code = '$searchdept' ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $array[] = $row;
                } return ['status' => true, 'data' => $array];
            } else {
                return ['status' => false, 'msg' => 'No Record is present Yet!'];
            }
        }

        function program_detail($procode){
            global $connect;
            $sql = " SELECT id, Programme_code as procode, Programme_name as proname, Number_of_Semester as sem, Dept_code FROM `programme` WHERE id = '$procode' ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                $row = $result->fetch_assoc();
                return ['status' => true, 'data' => $row];
            } else {
                return ['status' => false, 'msg' => 'Not found any detail.'];
            }
        }

        function delete_programme($procode){
            global $connect;
            $sql = " DELETE FROM `programme` WHERE id = '$procode' ";
            if($connect->query($sql)){
                return ['status' => true, 'msg' => 'Programme successfully deleted.'];
            } else {
                return ['status' => false, 'msg' => 'Failed to delete programme.'];
            }
        }


    // Course


        function verify_course_code($coursecode){
            global $connect;
            $sql = " SELECT * FROM `course` WHERE Course_code = '$coursecode' ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                return true;
            } return false;
        }

        function create_course_code($coursecode, $name, $credit, $deptcode){
            global $connect;
            if($this->verify_course_code($coursecode) === true){
                $sql = " UPDATE `course` SET `Course_code`='$coursecode',`Course_name`='$name',`Credit`='$credit',`Dept_code`='$deptcode' WHERE Course_code = '$coursecode' AND Dept_code = '$deptcode' ";
                if($connect->query($sql)){
                    return ['status' => true, 'msg' => 'Course successfully updated.'];
                } else {
                    return ['status' => false, 'msg' => 'Failed to update course.'];
                }
            } else {
                $sql = " INSERT INTO `course`(`Course_code`, `Course_name`, `Credit`, `Dept_code`) VALUES ('$coursecode','$name','$credit','$deptcode') ";
                if($connect->query($sql)){
                    return ['status' => true, 'msg' => 'Course successfully created.'];
                } else {
                    return ['status' => false, 'msg' => 'Failed to create course.s'];
                }
            }
        }

        function list_courses($searchquery){
            global $connect;
            $sql = "SELECT Course_code as id, Course_name as cname, Credit as cradit, Dept_code as deptcode FROM `course` ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $array[] = $row;
                } return ['status' => true, 'data' => $array];
            } else {
                return ['status' => false, 'msg' => 'Created course will appear here.'];
            }
        }

        function course_detail($coursecode){
            global $connect;
            $sql = " SELECT * FROM `course` WHERE Course_code = '$coursecode' ";
            $result = $connect->query($sql);
            if($result -> num_rows > 0){
                $row = $result->fetch_assoc();
                return ['status' => true, 'data' => $row];
            } else {
                return ['status' => false, 'msg' => 'Not found any detail.'];
            }
        }

        function delete_course($coursecode){
            global $connect;
            $sql = " DELETE FROM `course` WHERE Course_code = '$coursecode' ";
            if($connect->query($sql)){
                return ['status' => true, 'msg' => 'Course successfully deleted.'];
            } else {
                return ['status' => false, 'msg' => 'Failed to delete course.'];
            }
        } 

    // Session

    function verify_semester_code($term, $year){
        global $connect;
        $sql = " SELECT * FROM `semester` WHERE Term = '$term' AND Year = '$year'";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            return true;
        } return false;
    }

    function create_semester($term, $year){
        global $connect;
        if($this->verify_semester_code($term, $year) === true){
            $sql = " UPDATE `semester` SET `Term`='$term',`Year`='$year' Term = '$term' AND Year = '$year'";
            if($connect->query($sql)){
                return ['status' => true, 'msg' => 'Session successfully updated.'];
            } else {
                return ['status' => false, 'msg' => 'Failed to update session.'];
            }
        } else {
            $sql = " INSERT INTO `semester`(`Term`, `Year`) VALUES ('$term','$year') ";
            if($connect->query($sql)){
                return ['status' => true, 'msg' => 'Session successfully created.'];
            } else {
                return ['status' => false, 'msg' => 'Failed to create session.'];
            }
        }
    }

    function semester_detail($semestercode){
        global $connect;
        $sql = " SELECT `ID`, `Term`, `Year` FROM `semester` WHERE ID = '$semestercode' ";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            $row = $result->fetch_assoc();
            return ['status' => true, 'data' => $row];
        } else {
            return ['status' => false, 'msg' => 'Not found any detail.'];
        }
    }

    function list_session(){
        global $connect;
        $sql = "SELECT ID as id, Term as term, Year as year FROM `semester`";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            while($row = $result->fetch_assoc()){
                $array[] = $row;
            } return ['status' => true, 'data' => $array];
        } else {
            return ['status' => false, 'msg' => 'Created session will appear here.'];
        }
    }

    function delete_session($semestercode){
        global $connect;
        $sql = " DELETE FROM `semester` WHERE ID = '$semestercode' ";
        if($connect->query($sql)){
            return ['status' => true, 'msg' => 'Session successfully deleted.'];
        } else {
            return ['status' => false, 'msg' => 'Failed to delete session.'];
        }
    }


// Student

    function verify_student_code($enrollment){
        global $connect;
        $sql = " SELECT * FROM `student` WHERE Enrollment_No = '$enrollment' ";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            return true;
        } return false;
    }

    function create_student($enrollment, $name, $procode, $deptcode){
        global $connect;
        if($this->verify_student_code($enrollment) === true){
            $sql = " UPDATE `student` SET `Name`='$name',`Programme_code`='$procode',`Dept_code`='$deptcode' WHERE Enrollment_No = '$enrollment' ";
            if($connect->query($sql)){
                return ['status' => true, 'msg' => 'Student data successfully updated.'];
            } else {
                return ['status' => false, 'msg' => 'Failed to update student data.'];
            }
        } else {
            $sql = " INSERT INTO `student`(`Enrollment_No`, `Name`, `Programme_code`, `Dept_code`) VALUES ('$enrollment','$name','$procode','$deptcode') ";
            if($connect->query($sql)){
                return ['status' => true, 'msg' => 'Student successfully created.'];
            } else {
                return ['status' => false, 'msg' => 'Failed to create student.'];
            }
        }
    }

    function student_detail($enrollment){
        global $connect;
        $sql = " SELECT `Enrollment_No`, `Name`, `Programme_code`, `Dept_code` FROM `student` WHERE Enrollment_No = '$enrollment' ";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            $row = $result->fetch_assoc();
            return ['status' => true, 'data' => $row];
        } else {
            return ['status' => false, 'msg' => 'Not found any detail.'];
        }
    }

    function list_student(){
        global $connect;
        $sql = "SELECT Enrollment_No as id, Name as name, Programme_code as procode, Dept_code as deptcode FROM `student`";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            while($row = $result->fetch_assoc()){
                $array[] = $row;
            } return ['status' => true, 'data' => $array];
        } else {
            return ['status' => false, 'msg' => 'Created course will appear here.'];
        }
    }

    function delete_student($enrollment){
        global $connect;
        $sql = " DELETE FROM `student` WHERE Enrollment_No = '$enrollment' ";
        if($connect->query($sql)){
            return ['status' => true, 'msg' => 'Student successfully deleted.'];
        } else {
            return ['status' => false, 'msg' => 'Failed to delete student.'];
        }
    }


// Offered
    function list_courses_by_department($deptcode){
        global $connect;
        $sql = "SELECT Course_code as id, Course_name as cname, Credit as cradit, Dept_code FROM `course` WHERE Dept_code = '$deptcode' ";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            while($row = $result->fetch_assoc()){
                $array[] = $row;
            } return ['status' => true, 'data' => $array];
        } else {
            return ['status' => false, 'msg' => 'Not found any course'];
        }
    }
    function course_by_department($deptcode){
        global $connect;
        $sql = " SELECT * FROM `course` WHERE Dept_code = '$deptcode' ";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            while($row = $result->fetch_assoc()){
                $array[] = $row;
            } return ['status' => true, 'data' => $array];
        } else {
            return ['status' => false, 'msg' => 'Not found any course.'];
        }
    }

    function verify_offer_code($semestercode, $coursecode, $programid){
        global $connect;
        $sql = " SELECT * FROM `offered` WHERE sem_ID = '$semestercode' AND course_code = '$coursecode' AND Programme_id = '$programid' ";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            return true;
        } return false;
    }

    function create_offer($semestercode, $coursecode, $programid){
        global $connect;
        if($this->verify_offer_code($semestercode, $coursecode, $programid) === true){
            $sql = " DELETE FROM `offered` WHERE sem_ID = '$semestercode' AND course_code = '$coursecode' AND Programme_id = '$programid' ";
            if($connect->query($sql)){
                return ['status' => true, 'msg' => 'Offer successfully removed.'];
            } else {
                return ['status' => false, 'msg' => 'Failed to remove offer.'];
            }
        } else {
            $sql = " INSERT INTO `offered`(`sem_ID`, `course_code`, `Programme_id`) VALUES ('$semestercode','$coursecode', '$programid') ";
            if($connect->query($sql)){
                return ['status' => true, 'msg' => 'Offer successfully selected.'];
            } else {
                return ['status' => false, 'msg' => 'Failed to select offer.'];
            }
        }
    }

    function list_offer($semestercode, $programid){
        global $connect;
        $sql = " SELECT o.offer_ID, o.course_code, c.Course_name FROM `offered` o, course c WHERE o.course_code = c.Course_code AND o.Programme_id = '$programid' AND o.sem_ID = '$semestercode'";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            while($row = $result->fetch_assoc()){
                $array[] = $row;
            } return ['status' => true, 'data' => $array];
        } else {
            return ['status' => false, 'msg' => 'Selected offers will appear here.'];
        }
    }

    function offer_detail($offerid){
        global $connect;
        $sql = " SELECT `offer_ID`, `sem_ID`, `course_code` FROM `offered` WHERE offer_ID = '$offerid' ";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            $row = $result->fetch_assoc();
            return ['status' => true, 'data' => $row];
        } else {
            return ['status' => false, 'msg' => 'Not found any detail.'];
        }
    }

    function delete_offer($offerid){
        global $connect;
        $sql = " DELETE FROM `offered` WHERE offer_ID = '$offerid' ";
        if($connect->query($sql)){
            return ['status' => true, 'msg' => 'Offer successfully deleted.'];
        } else {
            return ['status' => false, 'msg' => 'Failed to delete offer.'];
        }
    }


// Register course

    function check_registration($enrollment, $offercourseid, $semestercode){
        global $connect;
        $sql = " SELECT * FROM `register_course` WHERE Enrollment_No = '$enrollment' AND Offer_course_id = '$offercourseid' AND SessionID = '$semestercode' ";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            return true;
        } return false;
    }

    function register_course($enrollment, $offercourseid, $semestercode){
        global $connect;
        if($this->verify_student_code($enrollment) === true){
            if($this->check_registration($enrollment, $offercourseid, $semestercode) === true){
                $sql = " DELETE FROM `register_course` WHERE Enrollment_No = '$enrollment' AND Offer_course_id = '$offercourseid' AND SessionID = '$semestercode' ";
                if($connect->query($sql)){
                    return ['status' => true, 'msg' => 'Course successfully removed.'];
                } else {
                    return ['status' => false, 'msg' => 'Failed to remove course.'];
                }
            } else {
                $sql2 = " INSERT INTO `register_course`(`Enrollment_No`, `Offer_course_id`, `SessionID`) VALUES ('$enrollment','$offercourseid', '$semestercode') ";
                if($connect->query($sql2)){
                    return ['status' => true, 'msg' => 'Course successfully added.'];
                } else {
                    return ['status' => false, 'msg' => 'Failed to add course.'];
                }
            }
        } else {
            return ['status' => false, 'msg' => 'Enrollment number is invalid.'];
        }
    }

    function list_registered_course($enrollment, $semestercode){
        global $connect;
        $sql = " SELECT Offer_course_id as offerid, c.Course_code, c.Course_name  FROM `register_course` r, course c, offered o WHERE Enrollment_No = '$enrollment' AND Offer_course_id = o.offer_ID AND o.course_code = c.Course_code AND SessionID = '$semestercode' ";
        $result = $connect->query($sql);
        if($result -> num_rows > 0){
            while($row = $result->fetch_assoc()){
                $array[] = $row;
            } return ['status' => true, 'data' => $array];
        } else {
            return ['status' => true, 'msg' => 'Selected course will appear here.'];
        }
    }


// Generate exam schedule
function getAllUniqueCourse()
{
	global $connect;

	
    $sql = "SELECT DISTINCT `Course Id` FROM temp";

    $result = $connect -> query($sql);
    if($result->num_rows > 0){

        while($row = $result->fetch_assoc()){
            $array[] = $row;
        }  
        //print_r($array);
        return $array;
    } 
	echo "false";
    return false;
}
function checkIntersection($c1, $c2){ 
	global $connect;
    $sql = "SELECT t1.`Student Id` FROM temp t1 INNER JOIN temp t2 ON t1.`Student Id` = t2.`Student Id` WHERE t1.`Course Id` = '$c1' AND t2.`Course Id` = '$c2'";
    $result = $connect->query($sql);
    if($result->num_rows > 0){
        return true;
    }
    return false;
}

function Algorithm () {
	$course = $this->getAllUniqueCourse();
	$n = count($course);
	

	$schedule = array();
	for($i=0; $i < $n; $i++){
		array_push($schedule, array() );
	}
	for($i=0; $i < $n; $i++){
		for($j=0; $j < $n; $j++){
			$schedule[$i][$j] = -1;
		}
	}

	//print_r($course);

	for($i=0; $i < $n; $i++){
		$a = $course[$i]["Course Id"];
		$this->putInSchedule($schedule, $a, $n);
	}
    return ['status' => true, 'data' => $schedule];
}

function putInSchedule(&$schedule, $a, $n)
{
	//print_r ($a);
	for($i=0; $i < $n; $i++){
		for($j=0; $j < $n; $j++){
			$c = $schedule[$i][$j];
			if($c == -1){
				$schedule[$i][$j] = $a;
				return;
			}
			if($this->checkIntersection($c, $a)){
				break;
			}
		}
	}
}

    function generate_schedule(){

    }



    } // End of the Exam class
?>