import Note from "./Note";
import CreateNote from "./CreateNote";
import '../css/Note.css';
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

const BASE_URL = 'http://localhost:8000';

function Notes (){
    //states
    const [notes,setNotes] = useState([]);
    const [inputText,setInputText] = useState("");
    const [loading,setLoading] = useState(true);

    //get text and store in state
    const textHandler = (e) =>{
        setInputText(e.target.value);
    }

    //add new note to the notes state array
    const saveHandler = () =>{
        fetch(`${BASE_URL}/notes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }),
          })
            .then((res) => res.json())
            .then((data) => {
              setNotes((prevState) => [...prevState, data]);
              setInputText('');
            });
    }

    //delete note
    const deleteHandler = (id) =>{
        fetch(`${BASE_URL}/notes/${id}`, {
            method: 'DELETE',
          })
          .then(() => {
            const filteredNotes = notes.filter((note) => note._id !== id);
            setNotes(filteredNotes);
          });
    }

    //get 
    useEffect(()=>{
        setLoading(true);
        fetch(`${BASE_URL}/notes`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNotes(data);
        }
        setLoading(false);
      });
    },[])

    //saving data to local storage
    useEffect(()=>{
        if(loading) {
            localStorage.setItem('Notes',JSON.stringify(notes));
        }
        
    },[notes,loading])

    return (
        <div className='notes'>
             {notes.map((note)=>(
                <Note 
                key={note.id}
                note = {note}
                deleteHandler={deleteHandler}/>
             ))}
             <CreateNote 
             textHandler = {textHandler}
             saveHandler = {saveHandler}
             inputText = {inputText}
             />
        </div>
    );
}

export default Notes;
