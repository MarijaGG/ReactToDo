import { useState } from 'react'
import ToDo from './ToDo'
import DiariesList from './DiariesList';
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: "Iemācīties React", completed: false },
    { id: 2, task: "Iemācīties Laravel", completed: true },
    { id: 3, task: "Nopirkt pienu", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

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
