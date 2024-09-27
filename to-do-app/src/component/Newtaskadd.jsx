import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { useNavigate } from 'react-router-dom';
import './newtask.css'; 

function Newtaskadd() {
  const [user, setUser] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(''); 
  const [comments, setComments] = useState('');
  const navigate = useNavigate();

  const save = async (e) => {
    e.preventDefault();
    
    // Construct the new task object
    let newTask = { user, status, dueDate, priority, comments };

    try {
      // Make a POST request to add the new task
      const response = await fetch("http://localhost:3000/NewTask", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is ok (status 200-299)
      if (response.ok) {
        alert("New task added successfully!");
        navigate('/'); // Redirect to the main task list
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task. Please try again.');
    }
  };

  return (
    <div className="container mt-4 ">
  <h2>Add New Task</h2>
  <form onSubmit={save} className=''>
    <div className="mb-3 ">
      <label htmlFor="user" className="form-label">Assigned To</label>
      <input 
        type="text" 
        className="form-control" 
        id="user" 
        value={user} 
        onChange={(e) => setUser(e.target.value)} 
        required 
      />
    </div>
    <div className="mb-3">
      <label htmlFor="status" className="form-label">Status</label>
      <input 
        type="text" 
        className="form-control" 
        id="status" 
        value={status} 
        onChange={(e) => setStatus(e.target.value)} 
        required 
      />
    </div>
    <div className="mb-3">
      <label htmlFor="dueDate" className="form-label">Due Date</label>
      <input 
        type="date" 
        className="form-control" 
        id="dueDate" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
        required 
      />
    </div>
    <div className="mb-3">
      <label htmlFor="priority" className="form-label">Priority</label>
      <input 
        type="text" 
        className="form-control" 
        id="priority" 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)} 
        required 
      />
    </div>
    <div className="mb-3">
      <label htmlFor="comments" className="form-label">Comments</label>
      <textarea 
        className="form-control" 
        id="comments" 
        value={comments} 
        onChange={(e) => setComments(e.target.value)} 
        rows="3"
      ></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Add Task</button>
  </form>
</div>

  );
}

export default Newtaskadd;
