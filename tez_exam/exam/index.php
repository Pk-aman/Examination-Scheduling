<?php
    require_once '../connect.php';
    require_once '../input.php';

    $error = 'Something is wrong.';

    if($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'GET' ){
		http_response_code(200);
        echo json_encode([
            'status' => false,
            'message' => 'Invalid request method'
        ]); exit();
	}

    require_once '../class/class.php';

    $exam = new Exam();

// Department
    if(isset($_POST['create-department'])){
        if(clean('create-department') && clean('name')){
            $code = safeme($connect, 'create-department');
            $name = ucwords(safeme($connect, 'name'));

            echo json_encode($exam->create_department($code, $name));
        } else {
            echo json_encode(['status' => false, 'msg' => 'Please enter department name']);
        }
    }

    if(isset($_POST['list-departments'])){
        $searchquery = safeme($connect, 'list-departments');
        echo json_encode($exam->list_department($searchquery));
    }

    if(isset($_POST['get-department-detail'])){
        if(clean('get-department-detail')){
            $code = safeme($connect, 'get-department-detail');
            echo json_encode($exam->department_detail($code));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

    if(isset($_POST['delete-department'])){
        if(clean('delete-department')){
            $code = safeme($connect, 'delete-department');
            echo json_encode($exam->delete_department($code));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

// Program
    if(isset($_POST['create-program'])){
        if(clean('create-program') && clean('department_code') && clean('name') && clean('semester') ){
            $procode = safeme($connect, 'create-program');
            $deptcode = safeme($connect, 'department_code');
            $name = ucwords(safeme($connect, 'name'));
            $semester = (int)safeme($connect, 'semester');

            echo json_encode($exam->create_program($deptcode, $procode, $name, $semester));
        } else {
            echo json_encode (['status' => false, 'msg' => 'All fields are mandatory.']);
        }
    }

    if(isset($_POST['list-programs'])){
        //$deptcode = safeme($connect, 'list-programs');
        $searchquery = safeme($connect, 'list-programs');
        echo json_encode($exam->list_programs($searchquery));
    }

    if(isset($_POST['list-programs-by-dept'])){
        if(clean('searchdept')){
        //$deptcode = safeme($connect, 'list-programs');
        $searchdept = safeme($connect, 'list_programs_by_dept');
        echo json_encode($exam->list_programs_by_dept($searchdept));
        } else {
            echo json_encode (['status' => false, 'msg' => 'Worng Input.']);
        }
    }

    if(isset($_POST['get-program-detail'])){
        if(clean('get-program-detail')){
            $procode = safeme($connect, 'get-program-detail');
            //$deptcode = safeme($connect, 'department_code');
            echo json_encode($exam->program_detail($procode));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

    if(isset($_POST['delete-program'])){
        if(clean('delete-program')){
            $procode = safeme($connect, 'delete-program');
            //$deptcode = safeme($connect, 'department_code');
            echo json_encode($exam->delete_programme($procode));
        } else {
            return ['status' => false, 'msg' => $error];
        }
    }



// Course

    if(isset($_POST['course-by-department'])){
        if(clean('course-by-department')){
            $deptcode = safeme($connect, 'course-by-department');
            echo json_encode($exam->course_by_department($deptcode));
        } else {
            echo json_encode(['status' => false, 'msg' => 'Please select a department.']);
        }
    }

    if(isset($_POST['create-course'])){
        if(clean('create-course') && clean('department_code') && clean('name') && clean('credit') ){
            $coursecode = safeme($connect, 'create-course');
            $deptcode = safeme($connect, 'department_code');
            $name = ucwords(safeme($connect, 'name'));
            $credit = (int)safeme($connect, 'credit');

            echo json_encode($exam->create_course_code($coursecode, $name, $credit, $deptcode));
        } else {
            echo json_encode(['status' => false, 'msg' => 'All fields are mandatory.']);
        }
    }

    if(isset($_POST['list-courses'])){
        //$deptcode = safeme($connect, 'list-courses');
        $searchquery = safeme($connect, 'list-courses');
        echo json_encode($exam->list_courses($searchquery));
    }

    if(isset($_POST['get-course-detail'])){
        if(clean('get-course-detail')){
            $coursecode = safeme($connect, 'get-course-detail');
            echo json_encode($exam->course_detail($coursecode));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

    if(isset($_POST['delete-course'])){
        if(clean('delete-course')){
            $coursecode = safeme($connect, 'delete-course');
            //$deptcode = safeme($connect, 'department_code');
            echo json_encode($exam->delete_course($coursecode));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

//Session

    if(isset($_POST['create-semester'])){
        if(clean('term') && clean('year') ){
            $term = safeme($connect, 'term');
            $year = ucwords(safeme($connect, 'year'));

            echo json_encode($exam->create_semester($term, $year));
        } else {
            echo json_encode(['status' => false, 'msg' => 'All fields are mandatory.']);
        }
    }

    if(isset($_POST['list-session'])){
        //$deptcode = safeme($connect, 'list-courses');
        echo json_encode($exam->list_session());
    }

    if(isset($_POST['get-semester-detail'])){
        if(clean('get-semester-detail')){
            $semestercode = safeme($connect, 'get-semester-detail');
            echo json_encode($exam->semester_detail($semestercode));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

    if(isset($_POST['delete-semester'])){
        if(clean('delete-semester')){
            $semestercode = safeme($connect, 'delete-semester');
            echo json_encode($exam->delete_session($semestercode));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }


//Student

    if(isset($_POST['add-student'])){
        if(clean('add-student') && clean('name') && clean('procode') && clean('deptcode') ){
            $enrollment = safeme($connect, 'add-student');
            $name = ucwords(safeme($connect, 'name'));
            $procode = safeme($connect, 'procode');
            $deptcode = safeme($connect, 'deptcode');

            echo json_encode($exam->create_student($enrollment, $name, $procode, $deptcode));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

    if(isset($_POST['list-student'])){
        echo json_encode($exam->list_student());
    }
    

    if(isset($_POST['get-student-detail'])){
        if(clean('get-student-detail')){
            $enrollment = safeme($connect, 'get-student-detail');
            echo json_encode($exam->student_detail($enrollment));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

    if(isset($_POST['delete-student'])){
        if(clean('delete-student')){
            $enrollment = safeme($connect, 'delete-student');
            echo json_encode($exam->delete_student($enrollment));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

//Offer
    if(isset($_POST['list-courses-by-department'])){
        $deptcode = safeme($connect, 'list-courses-by-department');

        echo json_encode($exam->list_courses_by_department($deptcode));
    }

    if(isset($_POST['create-offer'])){
        if(clean('create-offer') && clean('semester-code') && clean('coursecode') ){
            $programid = safeme($connect, 'create-offer');
            $semestercode = safeme($connect, 'semester-code');
            $coursecode = safeme($connect, 'coursecode');

            echo json_encode($exam->create_offer($semestercode, $coursecode, $programid));
        } else {
            echo json_encode(['status' => false, 'msg' => 'All fields are mandatory.']);
        }
    }

    if(isset($_POST['list-offers'])){
        if(clean('list-offers') && clean('programid') ){
            $semestercode = safeme($connect, 'list-offers');
            $programid = safeme($connect, 'programid');
            echo json_encode($exam->list_offer($semestercode, $programid));
        } else {

        }
    }

    if(isset($_POST['get-offer-detail'])){
        if(clean('get-offer-detail')){
            $offerid = safeme($connect, 'get-offer-detail');
            echo json_encode($exam->offer_detail($offerid));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

    if(isset($_POST['delete-offer'])){
        if(clean('delete-offer')){
            $offerid = safeme($connect, 'delete-offer');
            echo json_encode($exam->delete_offer($offerid));
        } else {
            echo json_encode(['status' => false, 'msg' => $error]);
        }
    }

// Register course

    if(isset($_POST['register-course'])){
        if(clean('register-course') && clean('enrollment') && clean('sessionid') ){
            $offercourseid = safeme($connect, 'register-course');
            $enrollment = safeme($connect, 'enrollment');
            $semestercode = safeme($connect, 'sessionid');

            echo json_encode($exam->register_course($enrollment, $offercourseid, $semestercode));
        } else {
            echo json_encode(['status' => false, 'msg' => 'All selection are mandatory.']);
        }
    }

    if(isset($_POST['list-registered-course'])){
        if(clean('list-registered-course') && clean('sessionid')  ){
            $enrollment = safeme($connect, 'list-registered-course');
            $semestercode = safeme($connect, 'sessionid');

            echo json_encode($exam->list_registered_course($enrollment, $semestercode));
        } else {
            echo json_encode(['status' => false, 'msg' => 'All selection are mandatory.']);
        }
    }

// Generate Schedule

    if(isset($_POST['generate-schedule'])){
        if(clean('generate-schedule')){
            $sessionid = safeme($connect, 'generate-schedule');
            echo json_encode($exam->Algorithm());
        } else {
            echo json_encode(['status' => false, 'msg' => 'Please select session ID.']);
        }
    }




?>