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


function AddSession({api}) {
  const { code } = useParams()
  console.log(code)

  const [msgerr, setMsgerr] = React.useState('')
  const [msgsuccess, setMsgSuccess] = React.useState('')
  const [action, setAction] = React.useState('')

  const [sessionyear, setSessionYear] = React.useState('')
  const [sessionterm, setSessionTerm] = React.useState('')

  React.useEffect(() => {
    setSessionTerm('')
    setSessionYear('')
    var formdata = new FormData()
    formdata.append('get-semester-detail', code)
    axios.post(api, formdata)
    .then(function(res){
      if(res.data.status === true){
        setSessionTerm(res.data.data.Term)
        setSessionYear(res.data.data.Year)
      }
    })
  }, [code])

  const create_session = () => {
    setAction('uploading'); setMsgerr(''); setMsgSuccess('')
    var formdata = new FormData()
    formdata.append('create-semester', '')
    formdata.append('term', sessionterm)
    formdata.append('year', sessionyear)
    axios.post(api, formdata)
    .then(function(res){
        setAction('')
        if(res.data.status === true){
          setMsgSuccess(res.data.msg)
          setSessionTerm('')
          setSessionYear('')
        } else {
          setMsgerr(res.data.msg)
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
              Session
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
        <TextField disabled={code === '0' ? false : true} type='Number' required fullWidth id="outlined-basic" label="Enter Year" variant="outlined" value={sessionyear} onChange={(event) => setSessionYear(event.target.value)} />
        <FormControl fullWidth>
          <InputLabel id="Select Term">Select Term</InputLabel>
          <Select
            labelId="Select Term"
            id="Select Term"
            value={sessionterm}
            label="Select Term"
            onChange={(event) => setSessionTerm(event.target.value)}
          >
            <MenuItem value='Spring'>Spring</MenuItem>
            <MenuItem value='Autumn'>Autumn</MenuItem>
          </Select>
          </FormControl>
        { msgerr && <Alert severity='warning'>{msgerr}</Alert> }
        { msgsuccess && <Alert severity='success'>{msgsuccess}</Alert> }
        <Button variant="contained" onClick={() => create_session()} disabled={action === 'uploading' ? true : false} >{action === 'uploading' ? <CircularProgress size={24} /> : 'Submit'}</Button>
      </Stack>
    </Box>
    
    </Box>
  )
} 

export default AddSession