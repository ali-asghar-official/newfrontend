import React from 'react'
import './TodoList.css'
import { LuNotebookPen } from "react-icons/lu";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import {useState,useEffect} from 'react'
import { toast } from 'react-hot-toast';



const TodoList = () => {

  const [title,setTitle] = useState("")
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
 

  const titleChange = (event)=>{
    setTitle(event.target.value)
}


const addTodo = async (event) => {
  event.preventDefault();

      const response = await fetch("http://localhost:5000/todo/add",{
        method: "POST",
        body: JSON.stringify({title}),
        headers: {"Content-Type": "application/json"}
      });

      const result = await response.json();
      toast.success(result.message)
       fetchTodos();
      setTitle("")
};


useEffect(() => {
  fetchTodos();
}, []);


  const fetchTodos = async () => {
   
      const response = await fetch("http://localhost:5000/receive/todo");
      const data = await response.json();
      setTodos(data);
}


const deleteTodo = async (todo) => {
  await fetch(`http://localhost:5000/todo/${todo._id}`, {
    method: "DELETE",
  });

  fetchTodos();
};

const updateTodo = async (id, newTitle) => {
  await fetch(`http://localhost:5000/todo/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title: newTitle }),
    headers: { "Content-Type": "application/json" },
  });

  fetchTodos();
  setEditingId(null);
  setEditingText("");
};


const startEditing = (todo) => {
  setEditingId(todo._id);
  setEditingText(todo.title);
};





  return (
    <div className='todopage'>
 <div className='todo-container'>
<div className="todo-header">
     <h2>ToDo List <LuNotebookPen /></h2>
     
</div>
<div className="todo-body">
<input
    onChange={titleChange}
    value={title}
    type="text"
    className="todo-input"
    placeholder="Add your items"
/>
<FaCirclePlus onClick={addTodo} className='plus'/>
</div>
<h5 className="Alert">Alert</h5>
 <ul className="todo-list">
  {todos.map((todo) => (
    <li key={todo._id}>
      {editingId === todo._id ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          className="edit-input"
        />
      ) : (
        <span className="task">{todo.title}</span>
      )}

      <div className="adjust">
        {editingId === todo._id ? (
          <button onClick={() => updateTodo(todo._id, editingText)}>
            Save
          </button>
        ) : (
          <button onClick={() => startEditing(todo)}>
            <FaPencilAlt />
          </button>
        )}
        <button onClick={() => deleteTodo(todo)} className="delete-btn-2">
          <MdDelete />
        </button>
      </div>
    </li>
  ))}
</ul>


 </div>
 </div>

  )
}

export default TodoList
