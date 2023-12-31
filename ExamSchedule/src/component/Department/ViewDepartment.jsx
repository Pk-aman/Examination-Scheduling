import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import { Breadcrumbs, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const columns = [
  {
    field: 'id',
    headerName: 'Department Code',
    width: 150,
    editable: false,
  },
  {
    field: 'Dept_name',
    headerName: 'Department Name',
    width: 250,
    editable: false,
  }
];


export default function ViewDepartment({api}) {

  
  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    var formData = new FormData()
    formData.append('list-departments', '')
    axios.post(api, formData)
    .then(function(res){
      if(res.data.status === false){
        alert(res.data.msg)
      }else{
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
              <Home sx={{ mr: 0.5, color: 'gray' }} fontSize="inherit" color='gray'/>
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
              View
            </Typography>
          </Breadcrumbs>
        </div>
      </Box>
      <br/>
      <br/>
    <Box sx={{ height: 400, width: '100%' }}>
      { rows.length > 0 && 
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
      /> }
    </Box>
    </Box>
  );
}