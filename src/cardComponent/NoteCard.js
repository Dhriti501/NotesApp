import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import moment from 'moment'

const NoteCard = ({note, handleDelete}) => {

  return (
    <Card elevation={2} sx={{marginTop : '15px'}}>
        <CardHeader
            avatar={
              <Avatar sx={{backgroundColor:"#EB455F"}}
              >
                <IconButton >
                  <EventNoteIcon sx={{ color: "white" }}/>
                </IconButton>
                </Avatar>
            }
            action={
            <IconButton onClick = {() => handleDelete(note.id)} color="secondary">
                <DeleteIcon/>
            </IconButton>
        }
        title={note.data.title}
        subheader={note.data.category}
      />
      <CardContent >
        <div style={{overflowWrap: 'break-word',}}> 
          <Typography variant="body2" color="text.secondary" >
              {note.data.details}
            </Typography>
        </div>
      </CardContent>
      <CardContent>
      <Typography align='center'>
          Created on { moment(note.data.createdAt.toDate()).calendar()}          
        </Typography>
      </CardContent>
    </Card>
    
  )
}

export default NoteCard