import React from 'react'
import { Box } from '@mui/system'
import AppHeader from './AppHeader';
import LeftDrawer from './LeftDrawer';

const drawerWidth = 240;

const Layout = ({children}) => {

  return (
    <Box sx={{display : 'flex', }}>
         {/* side-bar - PERMANENT DRAWER */}
        <LeftDrawer drawerWidth={drawerWidth}/>

        {/* app header - shows date, avatar */}
        <AppHeader drawerWidth={drawerWidth}/>

        {/* children elements - remaining components */}
        <Box sx ={{
                background:"#EFFFFD",
                padding : "110px 50px 30px",
                width : "80vw",
                height:"100vh",
                
        }}>
            {children}
        </Box>        
    </Box>
        
  )
}

export default Layout