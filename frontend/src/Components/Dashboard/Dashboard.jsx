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
  fetch(endpoint)
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


  //this is called after the user has added a task
  //needs to call a fetch() post request to /todo/name/{userName}
  const handleAddTask = () => {
    console.log("Task added:", titleInput + " desc : " + descriptionInput);
    setShowModal(false);
    fetch(`api/todo/name/${userName}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title: titleInput, description : descriptionInput})
      })
      .then(() => {
      // After adding, refetch current list based on action
      let endpoint = `api/todo/name/${userName}`;
      if (action === "Completed Tasks") {
        endpoint = `api/todo/name/${userName}/completed`;
      } else if (action === "Tasks") {
        endpoint = `api/todo/name/${userName}/incomplete`;
      }
      return fetch(endpoint);
    })
    .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch tasks after adding");
    }
    return response.json();
  })
    .then(data => {
    setTasks(data);
  })
    .catch(error => {
    console.error(error);
  });
    setTitleInput("");
    setDescriptionInput("");
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
      <Button variant="primary" className="addItemBtn"
      onClick={() => setShowModal(true)}
      >Add Task</Button>
      <div className="taskList">
  {tasks.map((task, index) => (
    <div key={index} className="taskItem">
      <Form.Check 
        type="checkbox"
        id={`checkbox-${task.id}`} // assuming each task has a unique `id`
        label=""
        //onChange={() => handleCompleteTask(task.id)}
        checked={action === "Completed Tasks"} // optional — show checked in completed view
        disabled={action === "Completed Tasks"} // disable in completed view
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