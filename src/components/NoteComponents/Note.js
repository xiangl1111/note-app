import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined'

function Note ({
  note,
  deleteHandler,
}){
    return (
        <div className ='note'>
          <div className ='note_body'>{note.text}</div>
          <div className = 'note_footer'>
            <DeleteForeverOutlined
            onClick ={()=>deleteHandler(note.id)}
            className='note_delete'
            aria-hidden='true'
            ></DeleteForeverOutlined>
          </div>
        </div>
    );
}

export default Note;
