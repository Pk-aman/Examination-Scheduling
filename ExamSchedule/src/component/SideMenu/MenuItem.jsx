
import { NavLink} from 'react-router-dom'


/* MUI */
import { Box, Drawer, Typography, colors} from '@mui/material'

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useState } from 'react';

//-----------------------Icons------------------------------
import BusinessIcon from '@mui/icons-material/Business';
import { Add, Checklist, Dataset, Edit, InsertInvitation, Person, RemoveRedEye, Task, ViewList } from '@mui/icons-material';




export default function Header(){
  

    const [open, setOpen] = useState('')


    return(
        <Box>
            {/* <Drawer variant='permanent' PaperProps={{style: {width: '256px', marginTop: '65px', background: 'secondary.main'}}} sx={{display: {xs: 'none', md: 'block'}}} > */}
                <Box sx={{width: '256px', background: 'secondary.main'}}>
                  <NavLink to={'/'}>
                    <Box sx={{p: 1, display:'flex', alignItems:'center', justifyContent:'center'}} onClick={()=>setOpen(false)}>
                      <SpaceDashboardIcon sx={{color: 'black'}}/>
                        <Typography marginLeft={'10px'} color={'black'} fontFamily={'Arial'} fontSize={18}>Dashboard</Typography>
                    </Box>
                  </NavLink>
                  <List>
                    <ListItemButton onClick={()=> setOpen(open === 1 ? 0 : 1)}>
                      <ListItemIcon>
                        <BusinessIcon />
                      </ListItemIcon>
                      <ListItemText primary="Department" />
                      {open === 1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === 1 ? true : false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <NavLink to={'/department/add/0'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Add />
                            </ListItemIcon>
                            <ListItemText>
                              Add
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ----------------------------------------------------------------------- */}
                        <NavLink to={'/department/edit'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Edit />
                            </ListItemIcon>
                            <ListItemText>
                              Edit
                            </ListItemText>                        
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------ */}
                        <NavLink to={'/department/view'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <RemoveRedEye />
                            </ListItemIcon>
                            <ListItemText>
                              View
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* -------------------------------- */}
                      </List>
                    </Collapse>
                    {/* ================================================= Program ====================================================== */}

                    <ListItemButton onClick={()=> setOpen(open === 2 ? 0 : 2)}>
                      <ListItemIcon>
                        <Dataset />
                      </ListItemIcon>
                      <ListItemText primary="Program" />
                      {open === 2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === 2 ? true : false} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={'/programme/add/0'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Add />
                            </ListItemIcon>
                            <ListItemText>
                              Add
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ----------------------------------------------------------------------- */}
                        <NavLink to={'/programme/edit'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Edit />
                            </ListItemIcon>
                            <ListItemText>
                              Edit
                            </ListItemText>                        
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------ */}
                        <NavLink to={'/programme/view'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <RemoveRedEye />
                            </ListItemIcon>
                            <ListItemText>
                              View
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------- */}

                      </List>
                    </Collapse>

                    {/* ========================================= Course ====================================================== */}

                    <ListItemButton onClick={()=> setOpen(open === 3 ? 0 : 3)}>
                      <ListItemIcon>
                        <ViewList />
                      </ListItemIcon>
                      <ListItemText primary="Course" />
                      {open === 3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === 3 ? true : false} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={'/course/add/0'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Add />
                            </ListItemIcon>
                            <ListItemText>
                              Add
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ----------------------------------------------------------------------- */}
                        <NavLink to={'/course/edit'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Edit />
                            </ListItemIcon>
                            <ListItemText>
                              Edit
                            </ListItemText>                        
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------ */}
                        <NavLink to={'/course/view'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <RemoveRedEye />
                            </ListItemIcon>
                            <ListItemText>
                              View
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------- */}

                      </List>
                    </Collapse>
                    


                    {/* =============================================== Session ==================================================== */}

                    <ListItemButton onClick={()=> setOpen(open === 4 ? 0 : 4)}>
                      <ListItemIcon>
                        <InsertInvitation />
                      </ListItemIcon>
                      <ListItemText primary="Session" />
                      {open === 4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === 4 ? true : false} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={'/session/add/0'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Add />
                            </ListItemIcon>
                            <ListItemText>
                              Add
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ----------------------------------------------------------------------- */}
                        <NavLink to={'/session/edit'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Edit />
                            </ListItemIcon>
                            <ListItemText>
                              Edit
                            </ListItemText>                        
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------ */}
                        <NavLink to={'/session/view'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <RemoveRedEye />
                            </ListItemIcon>
                            <ListItemText>
                              View
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------- */}

                      </List>

                    </Collapse>

                    {/* =============================================== Offer Course ============================================= */}

                    <ListItemButton onClick={()=> setOpen(open === 5 ? 0 : 5)}>
                      <ListItemIcon>
                        <Checklist />
                      </ListItemIcon>
                      <ListItemText primary="Offer Course" />
                      {open === 5 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === 5 ? true : false} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={'/offercourse/add/0'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Add />
                            </ListItemIcon>
                            <ListItemText>
                              Add
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ----------------------------------------------------------------------- */}
                        <NavLink to={'/offercourse/edit'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Edit />
                            </ListItemIcon>
                            <ListItemText>
                              Edit
                            </ListItemText>                        
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------ */}
                        <NavLink to={'/offercourse/view'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <RemoveRedEye />
                            </ListItemIcon>
                            <ListItemText>
                              View
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------- */}

                      </List>

                    </Collapse>

                    {/* ===================================== Student ====================================================== */}

                    <ListItemButton onClick={()=> setOpen(open === 6 ? 0 : 6)}>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText primary="Student" />
                      {open === 6 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === 6 ? true : false} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={'/student/add/0'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Add />
                            </ListItemIcon>
                            <ListItemText>
                              Add
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ----------------------------------------------------------------------- */}
                        <NavLink to={'/student/edit'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Edit />
                            </ListItemIcon>
                            <ListItemText>
                              Edit
                            </ListItemText>                        
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------ */}
                        <NavLink to={'/student/view'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <RemoveRedEye />
                            </ListItemIcon>
                            <ListItemText>
                              View
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------- */}

                      </List>

                    </Collapse>

                    {/* ===================================== Register Course ====================================================== */}

                    <ListItemButton onClick={()=> setOpen(open === 7 ? 0 : 7)}>
                      <ListItemIcon>
                        <Task />
                      </ListItemIcon>
                      <ListItemText primary="Register Course" />
                      {open === 7 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === 7 ? true : false} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={'/registercourse/add/0'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Add />
                            </ListItemIcon>
                            <ListItemText>
                              Add
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ----------------------------------------------------------------------- */}
                        <NavLink to={'/registercourse/edit'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Edit />
                            </ListItemIcon>
                            <ListItemText>
                              Edit
                            </ListItemText>                        
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------ */}
                        <NavLink to={'/registercourse/view'} style={({isActive}) => { return { color: isActive ? 'blue' : 'black' }}}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <RemoveRedEye />
                            </ListItemIcon>
                            <ListItemText>
                              View
                            </ListItemText>
                          </ListItemButton>
                        </NavLink>
                        {/* ------------------------------------------------------------------------------- */}

                      </List>

                    </Collapse>

                  </List>
                </Box>
            {/* </Drawer> */}

        </Box>
    );
}