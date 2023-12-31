import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';


function AddCourse({api}) {
  const { code } = useParams()

  
  const [msgerr, setMsgerr] = React.useState('')
  const [msgsuccess, setMsgSuccess] = React.useState('')
  const [action, setAction] = React.useState('')

  const [coursecode, setCourseCode] = React.useState('')
  const [coursename, setCourseName] = React.useState('')
  const [coursecradit, setCourseCradit] = React.useState('')
  const [deptcode, setDeptcode] = React.useState([])

  const [dept, setDept] = React.useState([])
  //const [dept, setDept] = React.useState([])

  React.useEffect(() => {
    console.log(code)
    setCourseCode('')
    setCourseName('')
    setCourseCradit('')
    setDeptcode('')
    var formdata = new FormData()
    formdata.append('get-course-detail', code)
    axios.post(api, formdata)
    .then(function(res){
      if(res.data.status === true){
        setCourseCode(res.data.data.Course_code)
        setCourseName(res.data.data.Course_name)
        setCourseCradit(res.data.data.Credit)
        setDeptcode(res.data.data.Dept_code)
      }
    })
  }, [code])

  const create_course = () => {
    console.log(coursecode)
    setAction('uploading'); setMsgerr(''); setMsgSuccess('')
    var formdata = new FormData()
    formdata.append('create-course', coursecode)
    formdata.append('department_code', deptcode)
    formdata.append('name', coursename)
    formdata.append('credit', coursecradit)
    axios.post(api, formdata)
    .then(function(res){
        setAction('')
        if(res.data.status === true){
          setMsgSuccess(res.data.msg)
          setCourseCode('')
          setCourseName('')
          setCourseCradit('')
          setDeptcode('')
        } else {
          setMsgerr(res.data.msg)
        }
    })
  }

  React.useEffect(() => {
    var formData = new FormData()
    formData.append('list-departments', '')
    axios.post(api, formData)
    .then(function(res) {
      if(res.data.status === true){
        setDept(res.data.data)
      }
    })
  }, [])

  return (

    <Box  width={'100%'}>
      <Box>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center'}}
              to={'/'}
            >
              <HomeIcon sx={{ mr: 0.5, color: 'gray' }} fontSize="inherit" />
            </NavLink>
            <Link
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
            >
              Course
            </Link>
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              Add
            </Typography>
          </Breadcrumbs>
        </div>
      </Box>
      <Box display={'flex'} justifyContent={'center'} >
        <Stack spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap flexWrap="wrap" justifyContent={'center'} width={500}>

          <TextField required fullWidth id="outlined-basic" label="Course Code" variant="outlined" value={coursecode} onChange={(event) => setCourseCode(event.target.value)}/>
          <TextField required fullWidth id="outlined-basic" label="Course Title" variant="outlined" value={coursename} onChange={(event) => setCourseName(event.target.value)}/>
          <TextField required fullWidth id="outlined-basic" label="Course Cradit" variant="outlined" value={coursecradit} onChange={(event) => setCourseCradit(event.target.value)}/>
          <FormControl fullWidth>
          <InputLabel id="Department">Department</InputLabel>
          <Select
            labelId="Department"
            id="Department"
            value={deptcode}
            label="Department"
            onChange={(event) => setDeptcode(event.target.value)}
          >
            { dept.map((row, i) =>
            <MenuItem value={row.id} key={i} >({row.id}) - {row.Dept_name}</MenuItem>) }
          </Select>
          </FormControl>
          { msgerr && <Alert severity='warning'>{msgerr}</Alert> }
          { msgsuccess && <Alert severity='success'>{msgsuccess}</Alert> }
          <Button variant="contained"onClick={() => create_course()} disabled={action === 'uploading' ? true : false} >{action === 'uploading' ? <CircularProgress size={24} /> : 'Submit'}</Button>
        </Stack>
      </Box>
    </Box>
  )
} 

export default AddCourse