import { Print } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useReactToPrint } from "react-to-print";

function Dashboard({api}) {

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

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([])

  const generate_schedule = () => {
    var formData = new FormData()
    formData.append('generate-schedule', sessionid)
    axios.post(api, formData)
    .then(function(res){
      if(res.data.status === true){
        setRows(res.data.data)
      }
    })
  }

  const area = useRef()
  const print = useReactToPrint({
    content:() => area.current
  })

  return (
    <>
    <Box width={'100%'}>
      <Stack direction={'row'} mb={2} >
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
        <Button sx={{width: '500px'}} variant='contained' onClick={() => generate_schedule()} >Generate Exam Schedule</Button>
      </Stack>
      <Box textAlign={'end'}>
        <IconButton onClick={() => print()} ><Print/></IconButton>
      </Box>
      <Box ref={area} padding={5} >
        <Box className='print' >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
          <img src='https://www.eqmagpro.com/wp-content/uploads/2022/07/Tezpur-University.png' height={'150px'} width={'150px'} style={{marginRight: '10px', justifyContent: 'center'}}/>
          <Typography fontSize={40} color='blue' align='center' fontWeight='bold' >TEZPUR UNIVERSITY</Typography>
          <Typography fontSize={20} color='gray' align='center' fontWeight='bold' >Examination Scheduling Software</Typography>
          <Typography fontSize={20} color='gray' align='center' fontWeight='bold' >{}</Typography>
          </Stack>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {rows.slice(0).map((row, i) => (
                <TableRow key={i} >
                  <TableCell component='th' scope='row' key={i}>Day - {i+1}</TableCell>
                  { row.map((res, j) =>
                  <TableCell component="th" scope="row" key={j} >{res !== -1 && res}</TableCell> ) }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
    </Box>
    
    </>
  )
}

export default Dashboard