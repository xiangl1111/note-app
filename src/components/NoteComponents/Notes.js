import Note from "./Note";
import CreateNote from "./CreateNote";
import '../css/Note.css';
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

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
        setNotes((prevState)=>[
            ...prevState,
            {
                id:uuid(),
                text:inputText,
            }
        ]);

        setInputText("");
    }

    //delete note
    const deleteHandler = (id) =>{
        const filterdNotes= notes.filter((note)=> note.id !== id)
        setNotes(filterdNotes)
    }

    //get 
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('Notes'));
        if(Array.isArray(data) && data.length > 0){
            setNotes(data);
        }
        setLoading(false);
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
