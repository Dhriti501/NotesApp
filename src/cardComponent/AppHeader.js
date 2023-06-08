import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

//date
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
const auth = getAuth();


const AppHeader = ({drawerWidth}) => {
  const navigate = useNavigate();

  //getting current user 
  const signedInEmail = localStorage.getItem('userEmail');

  //getting user name from email using regex
  const userName = signedInEmail.match(/^([^@]*)@/)[1];
  const name = userName.charAt(0).toUpperCase() + userName.slice(1);

  //sign out current user
  const signoutUser = () => {
    signOut(auth)
    .then(() => {
      // Removing session data
      localStorage.removeItem('userEmail');
      console.log("Session data cleared!");

      // Sign-out successful.
      navigate('/login');
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
      alert(error.message)
    });
  }

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
              fontWeight="800"
              // marginRight="20px"
              marginLeft="20px"
              fontSize="28px"
              >
              {name}'s notes
              
          </Typography>
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
          
        </Box>
        <Button 
            variant="contained"
            color="error"
            onClick = {signoutUser}
            >Sign Out
            
          </Button>
          
          
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader