import LinearProgress from '@mui/material/LinearProgress';

function CreateNote ({
  textHandler,
  saveHandler,
  inputText,
}){
  const charLimit =100;
  const charLeft = charLimit - inputText.length;
    return (
        <div className ='note'>
            <textarea 
            cols='10' 
            rows='5'  
            placeholder='Type...' 
            maxLength='100'
            onChange={textHandler}
            value={inputText}
            > </textarea>
          <div className = 'note_footer'>
            <span className='label'> {charLeft} left</span>
            <button className='note_save'
            onClick={saveHandler}>Save</button>
          </div>
          <LinearProgress 
          className='char_progress'
          variant='determinate'
          value={charLeft}/>
        </div>
    );
}

export default CreateNote;