import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import { Breadcrumbs, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 150,
    editable: false,
  },
  {
    field: 'procode',
    headerName: 'Programme Code',
    width: 150,
    editable: false,
  },
  {
    field: 'proname',
    headerName: 'Programme Name',
    width: 150,
    editable: false,
  },
  {
    field: 'sem',
    headerName: 'Programme Duration',
    width: 150,
    editable: false,
  },
  {
    field: 'Dept_code',
    headerName: 'Department',
    width: 150,
    editable: false,
  }
];


function ViewProgram({api}) {

  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    // console.log("error")
    var formData = new FormData()
    formData.append('list-programs', '')
    axios.post(api, formData)
    .then(function(res){
      if(res.data.status === false){
        alert(res.data.msg)
      }else{
        // console.log(res.data.data[0]['proname'])
        setRows(res.data.data)
        
      }
      
    })
  }, [])


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
              <Home sx={{ mr: 0.5, color: 'gray' }} fontSize="inherit" />
            </NavLink>
            <Link
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
            >
              Program
            </Link>
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              View
            </Typography>
          </Breadcrumbs>
        </div>
      </Box>
      <br/>
      <br/>
    <Box sx={{ height: 400, width: '100%' }}>
    {rows.length > 0 && 
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      // checkboxSelection
      disableRowSelectionOnClick
    /> 
    } 
  </Box>
  </Box>
  )
}

export default ViewProgram