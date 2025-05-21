import React, { useState } from "react";
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
  const userName = location.state?.name || "Guest";
  const [action, setAction] = useState("Tasks");
  const [showModal, setShowModal] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  //this is called after the user has added a task
  const handleAddTask = () => {
    console.log("Task added:", titleInput + " desc : " + descriptionInput);
    setShowModal(false);
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
      >+</Button>
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