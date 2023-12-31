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
    headerName: 'ID',
    width: 150,
    editable: false,
  },
  {
    field: 'term',
    headerName: 'Term',
    width: 150,
    editable: false,
  },
  {
    field: 'year',
    headerName: 'Year',
    width: 150,
    editable: false,
  }
];


function ViewSession({api}) {

  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    // console.log("error")
    var formData = new FormData()
    formData.append('list-session', '')
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
              <Home sx={{ mr: 0.5, color: 'gray' }} fontSize="inherit"/>
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
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
      // checkboxSelection
      disableRowSelectionOnClick
    /> 
    } 
  </Box>
  </Box>
  )
}

export default ViewSession