import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import './Dashboard.css'


function Dashboard() {
   const navigate = useNavigate();
     const location = useLocation();
  const userName = location.state?.name || "Guest";
     const [action, setAction] = useState("Tasks");
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
      <Button variant="primary" className="addItemBtn">+</Button>
    </div>
    </div>
  );
}

export default Dashboard;