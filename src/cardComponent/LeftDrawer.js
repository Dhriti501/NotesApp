import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate} from 'react-router-dom';
import {Drawer, Typography } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';

const menuItems = [

    {
        title : "Create Notes",
        icon : <AddIcon color="secondary"/>,
        path : "/create"
    },
    {
        title : "My Notes",
        icon : <SubjectIcon color="secondary"/>,
        path : "/"
    }
]

const LeftDrawer = ({drawerWidth}) => {
    const navigate = useNavigate();

  return (
    <div>
        <Drawer
    variant="permanent"
    anchor="left"
    sx = {{
        width : drawerWidth,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
        },
    }}
    >
        {/* List heading  */}
        <Typography 
            variant ="h5"
            align = "center"
            padding="20px"
            color="secondary"
            // fontWeight="500"
        >
            📝  <b>Notes App</b> 
        </Typography>
        {/* List items */}
        <List>{
            menuItems.map((item => (
                <ListItem 
                button 
                onClick = {()=> navigate(item.path)}
                key={item.text}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary = {item.title}/>
                </ListItem>
            )))
        }   
        </List>
    </Drawer> 

    </div>
    
  )
}

export default LeftDrawer