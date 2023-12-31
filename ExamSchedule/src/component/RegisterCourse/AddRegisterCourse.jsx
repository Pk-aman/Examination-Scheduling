import { Home } from '@mui/icons-material'
import { Box, Breadcrumbs, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

function AddRegisterCourse({api}) {

  const [enrollment, setEntrollment] = React.useState('')

  const [programmeid, setProgrammeId] = React.useState('')
  const [pro, setPro] = React.useState([])

  const [sessionid, setSessionId] = React.useState('')
  const [session, setsession] = React.useState([])

  React.useEffect(() => {
    var formData = new FormData()
    formData.append('list-session', '')
    axios.post(api, formData)
    .then(function(res) {
      if(res.data.status === true){
        setsession(res.data.data)
      }
    })
  }, [])

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
    var formData = new FormData()
    formData.append('list-programs', '')
    axios.post(api, formData)
    .then(function(res) {
      if(res.data.status === true){
        setPro(res.data.data)
      }
    })
  }, [])

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [deptcourse, setDeptcourse] = useState([])
  useEffect(() => {
    get_dept_course(programmeid)
  }, [programmeid])
  const get_dept_course = (programmeid) => {
    setDeptcourse([])
    var formData = new FormData()
    formData.append('list-offers', sessionid)
    formData.append('programid', programmeid)
    axios.post(api, formData)
    .then(function(res) {
      if(res.data.status === true){
        setDeptcourse(res.data.data)
      }
    })
  }

  const [offercourse, setOffercourse] = useState([])
  useEffect(() => {
    get_offered_course()
  }, [])
  const get_offered_course = () => {
    setOffercourse([])
    var formData = new FormData()
    formData.append('list-registered-course', enrollment)
    formData.append('sessionid', sessionid)
    axios.post(api, formData)
    .then(function(res){
      if(res.data.status === true){
        setOffercourse(res.data.data)
      }
    })
  }

  const create_offer = (courseid) => {
    var formData = new FormData()
    formData.append('register-course', courseid)
    formData.append('enrollment', enrollment)
    formData.append('sessionid', sessionid)
    axios.post(api, formData)
    .then(function(res){
      alert(res.data.msg)
      if(res.data.status === true){
        get_offered_course()
      }
    })
  }

  return (
    <>
    <Box sx={{width: '100%'}} >
      <Box>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center'}}
              to={'/'}
            >
              <Home sx={{ mr: 0.5, color: 'gray' }} fontSize="inherit" />
            </NavLink>
            <Link
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
            >
              Register Course
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
      <br/>
      <br/>

      <TextField onKeyDown={(event) => event.key === 'Enter' && get_offered_course()} required fullWidth id="outlined-basic" label="Entrollment " variant="outlined" value={enrollment} onChange={(event) => setEntrollment(event.target.value)}/>

      <Stack direction='row' spacing={1.5} mt={1.5}>
        
        <FormControl fullWidth>
          <InputLabel id="Session">Session</InputLabel>
          <Select
            labelId="Session"
            id="Session"
            value={sessionid}
            label="Session"
            onChange={(event) => setSessionId(event.target.value)}
          >
            { session.map((row, i) =>
            <MenuItem value={row.id} key={i} >({row.year}) - {row.term}</MenuItem>) }
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="Programme">Programme</InputLabel>
          <Select
            labelId="Programme"
            id="Programme"
            value={programmeid}
            label="Programme"
            onChange={(event) => setProgrammeId(event.target.value)}
          >
            { pro.map((row, i) =>
            <MenuItem value={row.id} key={i} >({row.procode}) - {row.Dept_code}</MenuItem>) }
          </Select>
        </FormControl>
      </Stack>

      <Stack direction='row' spacing={1.5} mt={1.5}>
        
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {deptcourse.map((value) => {
            return (
              <ListItem
                key={value}
                disablePadding
                onClick={() => create_offer(value.offer_ID)}
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} >
                  <ListItemText primary={value.Course_name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List> 

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {offercourse.map((value) => {
            return (
              <ListItem
                key={value}
                disablePadding
                onClick={() => create_offer(value.offerid)}
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} >
                  <ListItemText primary={value.Course_name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>     

      </Stack>

          

    </Box>

    </>
  )
}

export default AddRegisterCourse