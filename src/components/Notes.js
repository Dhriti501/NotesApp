import React, {useEffect,useState} from 'react'
import { Container } from '@mui/system';
import NoteCard from '../cardComponent/NoteCard';
import Masonry from 'react-masonry-css';
import db from '../firebase';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Notes = () => {

  const [notes, setNotes] = useState([]);
  const colRef = collection(db, 'notes');
  const q = query(colRef, orderBy('createdAt','desc'))

  //function for fetching notes 
  const fetchAllNotes = async () =>{
    try{
        await onSnapshot(q,(snapshot)=>{
          setNotes(
            snapshot.docs.map((doc)=>({
              id:doc.id,
              data: doc.data(),
              // createdAt: doc.data().createdAt.seconds,
            }))
          );
        })
    }catch(error){
      console.log(error.message);
    }
  } 

  //FETCH NOTES using useEffect at mounting time 
  useEffect(()=>{
    fetchAllNotes();
  },[])
  
  console.log(notes)
  
  // DELETE Request 
  const handleDelete = async(id) =>{
    const docRef = doc(db,'notes',id)
    
     deleteDoc(docRef)
      .then(()=>{
        // alert('note deleted!!')
        console.log("deleted note!")
      })
  }
  
  return (    
    <Container>
       <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        >
        {notes.map((note) => (
          <div key={note.id} xs={12} sm={6} md={4} >
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}
        </Masonry>
    </Container>
  )
}

export default Notes


//FETCHING NOTES FROM FAKE REST API(JSON SERVER)
// fetch('http://localhost:8000/notes')
//   .then(res => res.json())
//   .then(data => setNotes(data))

//FETCHING DATA FROM FIREBASE 
//   onSnapshot(colRef , (snapshot) => {
//   const items = [];
//   snapshot.docs.forEach((doc)=>{
//     items.push({
//       ...doc.data(),
//       id : doc.id
//     })
//   })
//   // setNotes(items);
// })

//DELETING NOTES FROM FAKE JSON API
 // await fetch('http://localhost:8000/notes/'+id , {
    //   method : 'DELETE'
    // })
    // const newNotes = notes.filter(note => note.id !== id)
    // setNotes(newNotes)