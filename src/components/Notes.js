import React, {useEffect,useState} from 'react'
import { Container } from '@mui/system';
import NoteCard from '../cardComponent/NoteCard';
import Masonry from 'react-masonry-css';
import db from '../firebase';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  
  const [notes, setNotes] = useState([]);
  const signedInEmail = localStorage.getItem('userEmail');
  
  const navigate = useNavigate();


  //function for fetching notes 
  const fetchUserNotes = async () =>{
      // const colRef = collection(db, 'notes');
  const colRef = collection(db, signedInEmail);

  // console.log(auth.user)
  const q = query(colRef, orderBy('createdAt','desc'))
  
    try{
        await onSnapshot(q,(snapshot)=>{
          setNotes(
            snapshot.docs.map((doc)=>({
              id:doc.id,
              data: doc.data(),
            }))
          );
        })
    }catch(error){
      console.log(error.message);
    }
  } 

  //FETCH NOTES using useEffect at mounting time 
  useEffect(()=>{
    if (!signedInEmail){
      navigate('/login')
    }else{
      fetchUserNotes();
    }
  },[])

  // DELETE Request 
  const handleDelete = async(id) =>{
    // const docRef = doc(db,'notes',id)
    const docRef = doc(db, signedInEmail,id)
    
     deleteDoc(docRef)
      .then(()=>{
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