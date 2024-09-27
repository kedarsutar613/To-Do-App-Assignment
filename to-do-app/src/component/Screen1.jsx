import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, DropdownButton, Pagination, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { faBars, faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowAltCircleDown } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Screen1 = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5); // Number of tasks to show per page
  const navigate = useNavigate(); // Use navigate for routing

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/NewTask");
      setTasks(response.data); // Set tasks from the response
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Calculate the current tasks to be displayed
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleNewTask = () => {
    navigate('/newtaskadd'); // Navigate to add new task page
  };

  const handleEdit = (taskId) => {
    navigate(`/edittask/${taskId}`); // Navigate to edit page with the task ID
  };

  const handleDelete = async (taskId, user) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the task for ${user}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/NewTask/${taskId}`); // Make DELETE request
        alert("Task deleted successfully!");
        fetchTasks(); // Refresh the task list
      } catch (err) {
        console.error("Error deleting task:", err);
        alert('Error deleting task. Please try again.');
      }
    }
  };

  const handlePaginationClick = (page) => {
    if (page >= 1 && page <= Math.ceil(tasks.length / tasksPerPage)) {
      setCurrentPage(page);
    }
  };

  const handleTasksPerPageChange = (e) => {
    setTasksPerPage(Number(e.target.value)); // Update tasks per page
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
        <FontAwesomeIcon icon={faBars} className="text-primary " size="lg" />
        <h4 className="mb-6" style={{marginLeft:-270}}>Tasks</h4>
        <div>
          <Button variant="warning" className="me-2" onClick={handleNewTask}>
            New Task
          </Button>
          <Button variant="warning" onClick={fetchTasks}>
            Refresh
          </Button>
        </div>
      </div>

      <Form.Control type="search" placeholder="Search" className="mb-3" />

      <Table bordered hover striped responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th></th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td>
                <Form.Check type="checkbox" />
              </td>
              <td>
                <a href="#">{task.user}</a>
              </td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <DropdownButton id="dropdown-basic-button" title="">
                  <Dropdown.Item onClick={() => handleEdit(task.id)}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(task.id, task.user)}>Delete</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Form.Select style={{ width: "80px" }} onChange={handleTasksPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </Form.Select>

        <Pagination>
          <Pagination.First onClick={() => handlePaginationClick(1)}>
            <FontAwesomeIcon icon={faCircleUp} /> First
          </Pagination.First>
          <Pagination.Prev
            onClick={() => handlePaginationClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Pagination.Prev>
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            onClick={() => handlePaginationClick(currentPage + 1)}
            disabled={indexOfLastTask >= tasks.length}
          >
            Next
          </Pagination.Next>
          <Pagination.Last
            onClick={() =>
              handlePaginationClick(Math.ceil(tasks.length / tasksPerPage))
            }
          >
            <FaArrowAltCircleDown /> Last
          </Pagination.Last>
        </Pagination>
      </div>
    </div>
  );
};

export default Screen1;
