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


function AddProgram({api}) {
  const { pcode} = useParams()
  console.log (pcode)
  
  const [msgerr, setMsgerr] = React.useState('')
  const [msgsuccess, setMsgSuccess] = React.useState('')
  const [action, setAction] = React.useState('')

  const [procode, setProCode] = React.useState('')
  const [proname, setProName] = React.useState('')
  const [produration, setProDuration] = React.useState('')
  const [deptcode, setDeptcode] = React.useState('')


  const [dept, setDept] = React.useState([])

  React.useEffect(() => {
    console.log(pcode)
    setProCode('')
    setProName('')
    setProDuration('')
    setDeptcode('')
    var formdata = new FormData()
    formdata.append('get-program-detail', pcode)
    axios.post(api, formdata)
    .then(function(res){
      if(res.data.status === true){
        setProName(res.data.data.proname)
        setProCode(res.data.data.procode)
        setProDuration(res.data.data.sem)
        setDeptcode(res.data.data.Dept_code)
      }
    })
  }, [pcode])

  const create_program = () => {
    console.log(procode)
    setAction('uploading'); setMsgerr(''); setMsgSuccess('')
    var formdata = new FormData()
    formdata.append('create-program', procode)
    formdata.append('department_code', deptcode)
    formdata.append('name', proname)
    formdata.append('semester', produration)
    axios.post(api, formdata)
    .then(function(res){
        setAction('')
        if(res.data.status === true){
          setMsgSuccess(res.data.msg)
          setProCode('')
          setProName('')
          setProDuration('')
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
              href="/material-ui/getting-started/installation/"
            >
              Program
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

          <TextField  required fullWidth id="outlined-basic" label="Program Code" variant="outlined" value={procode} onChange={(event) => setProCode(event.target.value)}/>
          <TextField required fullWidth id="outlined-basic" label="Program Title" variant="outlined" value={proname} onChange={(event) => setProName(event.target.value)}/>
          <TextField required fullWidth id="outlined-basic" label="Program Duration" variant="outlined" value={produration} onChange={(event) => setProDuration(event.target.value)}/>
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
          <Button variant="contained"onClick={() => create_program()} disabled={action === 'uploading' ? true : false} >{action === 'uploading' ? <CircularProgress size={24} /> : 'Submit'}</Button>
        </Stack>
      </Box>
    </Box>
  )
} 

export default AddProgram