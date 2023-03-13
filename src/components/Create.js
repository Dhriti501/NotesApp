import { Typography } from '@mui/material'
import { Box, Button } from '@mui/material'
import { Container } from '@mui/system'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {TextField}  from '@mui/material'
import { useState } from 'react';
import {RadioGroup, FormLabel,FormControlLabel, Radio} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import db from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Create = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory ] = useState("todo");
  const navigate = useNavigate();

  const colRef = collection(db,'notes');
                                       
  const handleSubmit = (e) => { 
    e.preventDefault();
    if(!title){
      setTitleError(true);
      setDetailsError(false);
    }
    if(!details){
      setTitleError(false);
      setDetailsError(true);

    }
    if(title && details){
      setTitleError(false);
      setDetailsError(false);
      
      addDoc(colRef,{
        title : title,
        details : details,
        category : category,
        createdAt : serverTimestamp(),
      })
      .then(()=>{
        navigate('/')
      })
      .catch((err)=>console.log(err.message));
    }
  }
  
  return (
    <Container >
      {/* heading */}
        <Typography
            variant = "h4"
            color = "textSecondary"   
            fontWeight="medium"   
            align = "center" 
            >
            Create a new Note
        </Typography>

        {/* form fields  */}
        <form noValidate autoComplete="off" onSubmit = {handleSubmit}>
          <TextField 
            onChange = { (e) => setTitle(e.target.value)}
            label="Note Title" 
            variant="outlined"
            color = "primary" 
            fullWidth
            required
            sx = {{
              margin : "25px"
            }}
            error = {titleError}
            /> 
          <TextField 
          onChange = { (e) => setDetails(e.target.value)}
          label="Note  Body" 
          variant="outlined"
          color = "primary" 
          required
          fullWidth
          multiline
          rows={4}
          sx = {{
            margin : "25px"
          }}
          error={detailsError}
          />
            {/* radio buttons  */}
            <RadioGroup 
              value ={category} 
              onChange={(e) => setCategory(e.target.value)} 
              sx={{
                margin:"25px"
              }}>
              <FormLabel>Note Category</FormLabel>
                <FormControlLabel value="todo" control={<Radio/>} label="Todo"/>
                <FormControlLabel value="work" control={<Radio/>} label="Work"/>
                <FormControlLabel value="reminder" control={<Radio/>} label="Reminder"/>
                <FormControlLabel value="money" control={<Radio/>} label="Money"/>
            </RadioGroup>

            {/* create button  */}
            <Box textAlign="center">
              <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<ArrowForwardIcon />}
                  sx = {{
                    color : "white",
                    fontSize : "18px",
                  }}
                  className="submitBtn"
                  >
                  Create
              </Button> 
            </Box>      
        </form>
    </Container>   
)
}
export default Create


//JSON FORMAT TO ADD NOTE 
// //POST Request
// fetch('http://localhost:8000/notes',
//   {
//     method : "POST",
//     headers : {"Content-type" : "application/json"},
//     body : JSON.stringify({title,details,category})
//   }
// ).then(() => navigate('/'))