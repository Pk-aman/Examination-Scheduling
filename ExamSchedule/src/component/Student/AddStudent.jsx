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


function AddStudent({api}) {
  const { stdcode} = useParams()

  
  const [msgerr, setMsgerr] = React.useState('')
  const [msgsuccess, setMsgSuccess] = React.useState('')
  const [action, setAction] = React.useState('')

  const [enrollment, setEntrollment] = React.useState('')
  const [name, setName] = React.useState('')
  const [programme, setProgramme] = React.useState('')
  const [deptcode, setDeptcode] = React.useState('')


  const [dept, setDept] = React.useState([])
  const [pro, setPro] = React.useState([])

  React.useEffect(() => {
    console.log(stdcode)
    setEntrollment('')
    setName('')
    setProgramme('')
    setDeptcode('')
    var formdata = new FormData()
    formdata.append('get-student-detail', stdcode)
    axios.post(api, formdata)
    .then(function(res){
      if(res.data.status === true){
        setEntrollment(res.data.data.Enrollment_No)
        setName(res.data.data.Name)
        setProgramme(res.data.data.Programme_code)
        setDeptcode(res.data.data.Dept_code)
      }
    })
  }, [stdcode])

  const create_student = () => {
    console.log(enrollment)
    setAction('uploading'); setMsgerr(''); setMsgSuccess('')
    var formdata = new FormData()
    formdata.append('add-student', enrollment)
    formdata.append('name', name)
    formdata.append('procode', programme)
    formdata.append('deptcode', deptcode)

    axios.post(api, formdata)
    .then(function(res){
        setAction('')
        if(res.data.status === true){
          setMsgSuccess(res.data.msg)
          setEntrollment('')
          setName('')
          setProgramme('')
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

  React.useEffect(() => {
    // setPro([]);
    var formData = new FormData()
    formData.append('list-programs', '')
    //formData.append('searchdept', deptcode)
    axios.post(api, formData)
    .then(function(res) {
      if(res.data.status === true){
        setPro(res.data.data)
      }
      else{
        setPro([]);
      }
    })
  }, [deptcode])


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
              Student
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

          <TextField  required fullWidth id="outlined-basic" label="Entrollment " variant="outlined" value={enrollment} onChange={(event) => setEntrollment(event.target.value)}/>
          <TextField required fullWidth id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(event) => setName(event.target.value)}/>
          
          
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

          <FormControl fullWidth>
          <InputLabel id="Programme">Programme</InputLabel>
          <Select
            labelId="Programme"
            id="Programme"
            value={programme}
            label="Programme"
            onChange={(event) => setProgramme(event.target.value)}
          >
            { pro.map((row, i) =>
            <MenuItem value={row.procode} key={i} >({row.procode}) - {row.proname}</MenuItem>) 
            }
          </Select>
          </FormControl>
          
          { msgerr && <Alert severity='warning'>{msgerr}</Alert> }
          { msgsuccess && <Alert severity='success'>{msgsuccess}</Alert> }
          <Button variant="contained"onClick={() => create_student()} disabled={action === 'uploading' ? true : false} >{action === 'uploading' ? <CircularProgress size={24} /> : 'Submit'}</Button>
        </Stack>
      </Box>
    </Box>
  )
} 

export default AddStudent