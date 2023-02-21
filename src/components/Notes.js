import React, {useEffect,useState} from 'react'
import { Grid} from '@mui/material';
// import { Paper} from '@mui/material';
import { Container } from '@mui/system';
import NoteCard from '../cardComponent/NoteCard';
import Masonry from 'react-masonry-css'


const Notes = () => {

  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  },[])

  // DELETE Request 
  const handleDelete = async(id) =>{
    await fetch('http://localhost:8000/notes/'+id , {
      method : 'DELETE'
    })

    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)

  }

  return (
    <Container>
       <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
       >
        {notes.map(note => (
          <div key={note.id} xs={12} sm={6} md={4} >
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}
        </Masonry>
    </Container>
     
      

    
  )
}

export default Notes