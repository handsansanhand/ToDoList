import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Dashboard.css'


function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const userName = location.state?.name || "Guest";
  const [action, setAction] = useState("Tasks");
  const [showModal, setShowModal] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
const [error, setError] = useState("");

useEffect(() => {
  fetchTasks(action);
}, [userName, action]);

const fetchTasks = (currentAction) => {
  setTasks([]);
  let endpoint = `api/todo/name/${userName}`;
  if (currentAction === "Completed Tasks") {
    endpoint = `api/todo/name/${userName}/completed`;
  } else if (currentAction === "Tasks") {
    endpoint = `api/todo/name/${userName}/incomplete`;
  }
  return fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return response.json();
    })
    .then(data => {
      setTasks(data);
    })
    .catch(error => {
      console.error(error);
    });
};

//this is called after a task is completed, calling PUT /api/todo/taskID
  const handleCompleteTask = (taskId) => {
  fetch(`api/todo/${taskId}`, {
    method: "PUT", // or POST/PATCH if that's how your API is set up
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to complete task");
      }
      // after marking complete, refresh the current list
      fetchTasks(action);
    })
    .catch(error => {
      console.error(error);
    });
};
  //this is called after the user has added a task
  //needs to call a fetch() post request to /todo/name/{userName}
const handleAddTask = () => {
  setError("");
  if (!titleInput.trim()) {
  setError("Task title cannot be empty.");
  return;
  }
  fetch(`api/todo/name/${userName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: titleInput, description: descriptionInput })
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text); // this will jump to catch()
        });
      }
      // if post succeeded, return something to continue
      return true;
    })
    .then(() => {
      // after successful add, refetch tasks
      return fetchTasks(action);
    })
    .then(() => {
      // finally, close modal and reset inputs after everything succeeded
      setShowModal(false);
      setTitleInput("");
      setDescriptionInput("");
    })
    .catch(error => {
      console.error(error);
      // only sets error and leaves modal open
      setError(error.message);
    });
};

  return (
    
    <div>
      <div className="userDropDown">
            <DropdownButton id="dropdown-basic-button" title={userName}>
      <Dropdown.Item href="#/action-1" onClick={() => {
        navigate('/');
      }}>Log Out</Dropdown.Item>
      </DropdownButton>
      </div>
    <div className="bigtitle">
        To Do List
    </div>

    <div className="container"> 
     <div className="topRow">
           <div className={action==="Completed Tasks"? "submit gray" : "submit"}
                           onClick={()=>{
                    setAction("Tasks")
                    }}>
            Tasks</div>
          <div className={action==="Tasks"? "submit gray" : "submit"}
                           onClick={()=>{
                    setAction("Completed Tasks")
                    }}>
            Completed Tasks</div>
      </div>
     {action === "Tasks" && (
  <Button 
    variant="primary" 
    className="addItemBtn"
    onClick={() => setShowModal(true)}
  >
    Add Task
  </Button>
)}
      <div className="taskList">
  {tasks.map((task, index) => (
    <div key={index} className="taskItem">
      <Form.Check 
        type="checkbox"
        id={`checkbox-${task.id}`} //send the task id
        label=""
        onChange={() => handleCompleteTask(task.id)}
        checked={action === "Completed Tasks"} //show checked in completed view
      />
      <div className="taskContent">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
    </div>
  ))}
</div>
    </div>
     {/* the form that pops up when a user is prompted to enter a to do item */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="formBigTitle">Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group className="mb-3">
    <Form.Label className="formTitle">Title</Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter task title..."
      value={titleInput}
      onChange={(e) => setTitleInput(e.target.value)}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label className="formDescription">Description</Form.Label>
    <Form.Control
      as="textarea"
      rows={4}
      placeholder="Enter task description..."
      value={descriptionInput}
      onChange={(e) => setDescriptionInput(e.target.value)}
    />
  </Form.Group>
   {error && <div className="error">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;