import React from 'react'
import Header from './component/HeaderBar/Header'
import MenuItem from "./component/SideMenu/MenuItem"
import {Outlet} from 'react-router-dom'
import { Box } from '@mui/material'
import AddDepartment from './component/Department/AddDepartment'


function Layout() {
  return (
    <>
      <Header/>
      <Box display={'flex'} alignItems={'top'} >
        <MenuItem/>
        {/* <AddDepartment/> */}
        <Outlet />
      </Box>
    </>
  )
}

export default Layout