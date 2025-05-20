import React, { useState } from "react";

function ToDo({ id, task, completed, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  function handleSave() {
    onEdit(id, editedTask);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedTask(task);
    setIsEditing(false);
  }

  return (
    <article>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
      </label>

      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button onClick={handleSave}>✅</button>
          <button onClick={handleCancel}>❌</button>
        </>
      ) : (
        <>
          <span>
            {task}
          </span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => onDelete(id)}>❌</button>
        </>
      )}
    </article>
  );
}

export default ToDo;
