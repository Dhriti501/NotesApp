import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AssignmentIcon from '@mui/icons-material/Assignment';
import moment from 'moment'

const NoteCard = ({note, handleDelete}) => {

  const categoryColors = {
    money :"#54B435",
    work : "#30E3DF",
    todo : "#FF6464",
    reminder : "#FFD700",
  }

  //resolving toDate error 
  try{
    var dateCreated = moment(note.data.createdAt.toDate()).calendar();
  }catch(e){
    // console.log(e);
  }

  const categoryIcon = () => {
    if(note.data.category === "money"){
      return <CurrencyRupeeIcon sx={{color : "white"}}/>;
    }else if(note.data.category === "work"){
      return <AssignmentIcon sx={{color : "white"}}/>;
    }else if(note.data.category === "todo"){
      return <FormatListBulletedIcon sx={{color : "white"}}/>;
    }else if(note.data.category === "reminder"){
      return <EventNoteIcon sx={{color : "white"}}/>;
    }
    return null;
  };

  const defaultColor = "grey"
  // console.log("this is note data : ",note.data);

  return (
    <Card elevation={2} sx={{marginTop : '15px'}}>
        <CardHeader
            avatar={
              // <Avatar sx={{backgroundColor:"#EB455F"}}
              <Avatar sx={{backgroundColor: categoryColors[note.data.category] ?? defaultColor}}
              >
                <IconButton >
                  {categoryIcon()}
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
          {/* Created on { moment(note.data.createdAt.toDate()).calendar()}           */}
          Created on {dateCreated}          
        </Typography>
      </CardContent>
    </Card>
    
  )
}

export default NoteCard