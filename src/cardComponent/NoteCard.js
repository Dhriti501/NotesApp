import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, yellow,green,blue } from '@mui/material/colors';


const NoteCard = ({note, handleDelete}) => {

  // let bgColor = (note) =>{
  //   if(note.category === "work"){
  //     return yellow;
  //   }
  //   if(note.category === "money"){
  //     return green;
  //   }
  //   if(note.category === "todo"){
  //     return red;
  //   }
  //   return blue[500];
  // }

  return (
    <Card elevation={2}>
        <CardHeader
            avatar={
              <Avatar sx={{backgroundColor:"#EB455F"}}
              >
                {note.category[0].toUpperCase()}</Avatar>
            }
            action={
            <IconButton onClick = {() => handleDelete(note.id)} color="secondary">
                <DeleteIcon/>
            </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
    
  )
}

export default NoteCard