import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, CircularProgress, Stack, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
function AddDepartment({api}) {
  const { deptcode } = useParams()
  console.log(deptcode)
  const [msg, setMsg] = React.useState('')
  const [msgsuccess, setMsgSuccess] = React.useState('')
  const [action, setAction] = React.useState('')

  const [code, setCode] = React.useState('')
  const [name, setName] = React.useState('')

  React.useEffect(() => {
    setName('')
    setCode('')
    var formdata = new FormData()
    formdata.append('get-department-detail', deptcode)
    axios.post(api, formdata)
    .then(function(res){
      if(res.data.status === true){
        setName(res.data.data.Dept_name)
        setCode(res.data.data.Dept_code)
      }
    })
  }, [])

  const create_dept = () => {
    setAction('uploading'); setMsg(''); setMsgSuccess('')
    var formdata = new FormData()
    formdata.append('create-department', code)
    formdata.append('name', name)
    axios.post(api, formdata)
    .then(function(res){
        setAction('')
        if(res.data.status === true){
          setMsgSuccess(res.data.msg)
          setCode(''); setName('')
        } else {
          setMsg(res.data.msg)
        }
    })
  }

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
              Department
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
    <Box display={'flex'} justifyContent={'center'}>
    <Stack spacing={{ xs: 1, sm: 2 }} direction="column"  justifyContent={'center'} width={500}>
        <TextField disabled={deptcode === '0' ? false : true} required fullWidth id="outlined-basic" label="Department Code" variant="outlined" value={code} onChange={(event) => setCode(event.target.value)} />
        <TextField required fullWidth id="outlined-basic" label="Department Title" variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
        { msg && <Alert severity='warning'>{msg}</Alert> }
        { msgsuccess && <Alert severity='success'>{msgsuccess}</Alert> }
        <Button variant="contained" onClick={() => create_dept()} disabled={action === 'uploading' ? true : false} >{action === 'uploading' ? <CircularProgress size={24} /> : 'Submit'}</Button>
      </Stack>
    </Box>
    
    </Box>
  )
} 

export default AddDepartment