import { useEffect, useState } from "react";
import ToDo from './ToDo'
import DiariesList from './DiariesList';
import './App.css'

function getLocalTodos() {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
}

function App() {
  const [todos, setTodos] = useState(getLocalTodos);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  function handleAdd(event) {
    event.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      task: newTask,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTask("");
  }

  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  }

  function handleToggle(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleEdit(id, newTask) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
  }

  return (
    <>
      <h1>Veicamie uzdevumi</h1>

      <form onSubmit={handleAdd}>
        <label>
          Jauns uzdevums:
          <input
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
        </label>
      </form>
      <br></br>

      {todos.map((todo) => (
        <ToDo
       key={todo.id}
       {...todo}
       onDelete={handleDelete}
       onToggle={handleToggle}
       onEdit={handleEdit} // ← šo pievieno
        />     
      ))}

      <h1>Dienasgrāmata</h1>
      <DiariesList />
    </>
  );
}

export default App;
