import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import { Delete, Edit } from '@mui/icons-material';



export default function EditProgram({api}) {
  const navi = useNavigate()
  const [rows, setRows] = React.useState([])
  const [query, setQuery] = React.useState('')


  React.useEffect(() => {
    get_pro()
  }, [])

  const get_pro = () => {
    var formData = new FormData()
    formData.append('list-programs', query)
    axios.post(api, formData)
    .then(function(res){
      if(res.data.status === false){
        alert(res.data.msg)
      } else {
        setRows(res.data.data)
      }
    })
  }

  const del_pro = (procode) => {
    if(confirm('Do you want to delete this department') === true){
      var formData = new FormData()
      formData.append('delete-program', procode)
      axios.post(api, formData)
      .then(function(res){
        if(res.data.status === true){
          get_pro()
        }
      })
    }
  }




  return (
    <Box>
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
              Programme
            </Link>
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              Edit
            </Typography>
          </Breadcrumbs>
        </div>
      </Box>



      <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          divider = {<Divider flexItem />}>
            
        <Box sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, backgroundColor: '#f3f3f3'}} >
            <TextField variant='outlined' fullWidth placeholder='Please enter programme code' onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && get_pro()} />
        </Box>
      </Stack>
      
      <TableContainer component={Paper}>
      <Table sx={{ height: 500, minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Programme code</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Duration (in Sem)</TableCell>
            <TableCell align="left">Department</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} >
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.procode}</TableCell>
              <TableCell align="left">{row.proname}</TableCell>
              <TableCell align="left">{row.sem}</TableCell>
              <TableCell align="left">{row.Dept_code}</TableCell>
              <TableCell align="right"><IconButton onClick={() => navi(`/programme/add/${row.id}`)}  ><Edit/></IconButton></TableCell>
              <TableCell align="right"><IconButton onClick={() => del_pro(row.id)}  ><Delete/></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Box>
  );
}