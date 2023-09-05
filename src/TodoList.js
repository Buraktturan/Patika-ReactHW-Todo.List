import React, { useState } from 'react';
import './TodoList.css'; // Import the CSS file

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('Personal');
  const [status, setStatus] = useState('Incomplete');
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

  // Arrays for categories and status options
  const categoryOptions = ['Personal', 'Work', 'Shopping'];
  const statusOptions = ['Incomplete', 'Complete', 'In Progress'];

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todoItem = {
        text: newTodo,
        category,
        status,
      };
      setTodos([...todos, todoItem]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    if (editIndex === index) {
      setEditIndex(null);
      setEditedTodo('');
      setEditedStatus('');
    }
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditedTodo(todos[index].text);
    setCategory(todos[index].category); 
    setEditedStatus(todos[index].status);
  };

  const saveEditedTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editedTodo;
    updatedTodos[index].category = category; 
    updatedTodos[index].status = editedStatus;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditedTodo('');
    setEditedStatus('');
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="input-field"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-field"
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select-field"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={addTodo} className="add-button">
          Add
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Todo</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                    className="input-field"
                  />
                ) : (
                  todo.text
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="select-field"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  todo.category
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className="select-field"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  todo.status
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <button
                      onClick={() => saveEditedTodo(index)}
                      className="edit-button"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditIndex(null)}
                      className="edit-button"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => editTodo(index)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => removeTodo(index)} className="remove-button">
                      Remove
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
