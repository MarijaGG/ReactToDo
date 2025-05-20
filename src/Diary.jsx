import { useState } from 'react';

function Diary({ id, title, body, date, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);

  function handleSave() {
    onEdit(id, editTitle, editBody);
    setIsEditing(false);
  }

  return (
    
    <article className="diaryEntry">
      
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <br />
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <br />
          <button onClick={handleSave}>✅</button>
          <button onClick={() => setIsEditing(false)}>❌</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{body}</p>
          <small>{date}</small>
          <br />
          <button onClick={() => setIsEditing(true)}>✏️ </button>
          <button onClick={() => onDelete(id)}>❌</button>
        </>
      )}
    </article>
  );
}

export default Diary;
