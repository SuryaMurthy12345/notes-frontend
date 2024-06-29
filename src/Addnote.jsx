import React, { useState } from 'react';


const Addnote = () => {


  const [notes, setNotes] = useState({
    title: '',
    note: ''
  });

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setNotes({ ...notes, [name]: value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    console.log(notes);
    try {
      const response = await fetch('https://notes-project-ad7d.onrender.com/enterNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notes)
      })
      if (response.ok) {
        alert("Successfully Note added")
        setNotes({ title: '', note: '' });

      } else {
        console.error("Failed to add")
      }
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div className='addnote' >
      <h1>Add Note Here</h1>
      <div>

        <form onSubmit={submitHandle}>
          <div className='labels'>
            <div className='label' >
              <label>Title:</label>
              <textarea
                rows='5'
                cols='30'
                name='title'
                value={notes.title}
                onChange={changeHandle} required
              > </textarea>
            </div>
            <div className='label' >
              <label>Content:</label>
              <textarea
                rows='5'
                cols='30'
                name='note'
                value={notes.note}
                onChange={changeHandle} required
              ></textarea>

            </div>
          </div>
          <div  className='sub'>
            <input type='submit' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
