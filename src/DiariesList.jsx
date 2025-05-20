import { useEffect, useState } from "react";
import Diary from './Diary';

function getLocalDiary() {
  const stored = localStorage.getItem("diaries");
  return stored ? JSON.parse(stored) : [];
}


function DiariesList() {
  const [diaries, setDiaries] = useState(getLocalDiary);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

    useEffect(() => {
    localStorage.setItem("diaries", JSON.stringify(diaries));
  }, [diaries]);

  function handleAdd(event) {
    event.preventDefault();
    const newEntry = {
      id: crypto.randomUUID(),
      title: newTitle,
      body: newBody,
      date: new Date().toISOString().split('T')[0],
    };
    setDiaries([...diaries, newEntry]);
    setNewTitle('');
    setNewBody('');
  }

  function handleDelete(id) {
    setDiaries((prev) => prev.filter((entry) => entry.id !== id));
  }

  function handleEdit(id, newTitle, newBody) {
    setDiaries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, title: newTitle, body: newBody }
          : entry
      )
    );
  }

  return (
    <div>
      <form onSubmit={handleAdd}>
        <label>
          Virsraksts:
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Saturs:
          <textarea
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          />
        </label>
        <br />  <br />
        <button type="submit" className="add">Pievienot</button>
      </form>

      <br></br>
      {diaries.map((entry) => (
        <Diary
          key={entry.id}
          id={entry.id}
          title={entry.title}
          body={entry.body}
          date={entry.date}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}

export default DiariesList;
