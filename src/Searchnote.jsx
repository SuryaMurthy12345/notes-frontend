import React, { useState } from 'react';
import './App.css'; 

const Searchnote = () => {
    const [text, setText] = useState('');
    const [found, setFound] = useState(false);
    const [res, setRes] = useState([]);

    const changeHandle = async (e) => {
        const newText = e.target.value;
        setText(newText);

        try {
            const apiresponse = await fetch(`https://notes-project-ad7d.onrender.com/getNote/${newText}`);
            if (!apiresponse.ok) {
                throw new Error("Failed");
            }
            const response = await apiresponse.json();
            console.log("Successfully searched", response);

            if (response.length > 0) {
                setRes(response);
                setFound(false);
            } else {
                setRes([]);
                setFound(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="search-container">
                <h2>Searchnote</h2>
                <form>
                    <label>Search By Title:</label>
                    <input type="search" value={text} onChange={changeHandle} />
                </form>
                <h3>{text}</h3>
                {found && <h3>Not found</h3>}
                <div className="result-container">
                    {res.map(item => (
                        <div key={item._id} className="result-item">
                            <p><strong>Title:</strong> {item.title}</p>
                            <p><strong>Note:</strong> {item.note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Searchnote;
