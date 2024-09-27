import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import './edit.css'; 
const Edittask = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const [task, setTask] = useState({
    user: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/NewTask/${id}`);
        setTask(response.data); // Set task data from API
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.put(`http://localhost:3000/NewTask/${id}`, task);
      alert('Task updated successfully!');
      navigate('/'); // Redirect back to the task list
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task. Please try again.');
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Edit Task</h2>
      <Form onSubmit={handleSave}>
        <Form.Group controlId="formUser">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            name="user"
            value={task.user}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={task.dueDate.substring(0, 10)} // Format the date correctly
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            type="text"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formComments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            name="comments"
            value={task.comments}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Save</Button>
      </Form>
    </div>
  );
};

export default Edittask;
