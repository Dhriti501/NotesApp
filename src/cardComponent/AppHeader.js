import { AppBar, Avatar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'

//date
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


const AppHeader = ({drawerWidth}) => {
  return (
     <AppBar
        // position="fixed"
        sx={{width: { sm: `calc(100% - ${drawerWidth}px)` }}}
    >
      <Toolbar 
        sx={{
          display:"flex",

          justifyContent:"space-between"
        }}
      >
        <Typography 
            color="white"
            padding="20px"
            fontWeight="600"
            fontSize="20px"
            >
            Today's date is {date}
          </Typography>
        <Box sx={{
          display : "flex",
          alignItems : "center",
        }}>
          <Typography
              color="white"
              fontWeight="600"
              marginRight="20px"
              fontSize="19px"
              >
              Dhriti
            </Typography>
            <Avatar src='./avt.jpg' />
        </Box>
          
          
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader