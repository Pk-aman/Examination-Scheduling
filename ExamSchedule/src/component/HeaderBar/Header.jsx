import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'


/* MUI */
import { Box, Drawer, Typography, Toolbar, AppBar, Divider, IconButton, Button } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Label, Menu, PowerSettingsNew } from '@mui/icons-material';



export default function Header(){
    

    const links = [
      {name: 'Dashboard', link: `/controller`, icon: <DashboardIcon/>},
      {name: 'Franchise', link: '/controller/franchises', icon: <AccountTreeIcon/>},
      {name: 'Course', link: '/controller/courses', icon: <BookIcon/>},
      {name: 'Student', link: '/controller/students', icon: <GroupIcon/>},
      {name: 'Gallery', link: '/controller/gallery', icon: <InsertPhotoIcon/>}
  ]

    return(
        <Box component='nav' sx={{marginBottom: 10}} >
            <AppBar color='primary' position='fixed' >
                <Toolbar>
                    {/* <img src='.. /assets/tulogo.png' height={'50px'} width={'50px'}/> */}
                    <img src='https://www.eqmagpro.com/wp-content/uploads/2022/07/Tezpur-University.png' height={'50px'} width={'50px'} style={{marginRight: '10px'}}/>
                    <Typography variant="h6" letterSpacing={2} component="div" sx={{ flexGrow: 1 }} >Tezpur University</Typography>
                    <Typography sx={{flexGrow: 1, xs: 'none', md: 'block'}}></Typography>
                    {/* <IconButton color='inherit' ><PowerSettingsNew/></IconButton>
                    <Box sx={{display: {xs: 'block', md: 'none'}}} >
                        <IconButton color='inherit' edge='end' ><Menu/></IconButton>
                    </Box> */}
                </Toolbar>
            </AppBar>   
        </Box>
    );
}