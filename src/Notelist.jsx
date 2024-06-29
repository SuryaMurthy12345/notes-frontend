import React, { useEffect, useState } from 'react'; 
import './App.css';

const Notelist = () => {
  const [upd, setUpd] = useState(false);
  const [newnote, setnewnote] = useState({ title: '', note: '' });
  const [id, getid] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://notes-project-ad7d.onrender.com/getNotes')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  const del = async (id) => {
    try {
      const apiresponse = await fetch(`https://notes-project-ad7d.onrender.com/deleteNote/${id}`, { method: 'DELETE' });

      if (apiresponse.ok) {
        console.log("Successfully deleted");
        setData(prevdata => prevdata.filter(item => item._id !== id));
      } else {
        console.log("Failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateHandle = (id) => {
    setUpd(true);
    getid(id);
    const notetoupdate = data.find(item => id === item._id);
    setnewnote({ title: notetoupdate.title, note: notetoupdate.note });
  };

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setnewnote({ ...newnote, [name]: value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const apiresponse = await fetch(`https://notes-project-ad7d.onrender.com/updateNote/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newnote),
      });

      if (!apiresponse.ok) {
        throw new Error("failed");
      }

      console.log("Successfully updated");
      setData(prevdata => prevdata.map(item => (item._id === id ? { ...item, ...newnote } : item)));
      setUpd(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="notelist">
        <h1>Notelist</h1>
        {data && data.map(item => (
          <div key={item._id} className="box">
            <div className="title">
              <li>Title: {item.title}</li>
            </div>
            <div className="note">Content: {item.note}</div>
            <div className="buttons">
              <button onClick={() => updateHandle(item._id)}>Update</button>
              <button onClick={() => del(item._id)}>Delete</button>
            </div>
            
            {upd && id === item._id && (
              <div className="update-form">
                <form onSubmit={submitHandle}>
                  <label>Enter New Title:</label>
                  <input type="text" name="title" value={newnote.title} onChange={changeHandle} /> <br />
                  <label>Enter New Content:</label>
                  <input type="text" name="note" value={newnote.note} onChange={changeHandle} />
                  <input type="submit" />
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notelist;
