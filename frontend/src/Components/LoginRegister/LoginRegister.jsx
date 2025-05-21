import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css'

/*React web app which handles functionality for signing up users and them logging in*/
const LoginRegister = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign Up");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //if the name or password is empty, or the api returns a failed request, then throw an error
    const handleSubmit = () => {
    if (!name || !password) {
      setError("Name and Password cannot be empty.");
    } else {
        if(action==="Sign Up") {
      setError("");
      // here send a fetch() call to the backend, need to first check if no errors were thrown
      fetch("api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name, password : password})
      })
      .then(response => { 
        alert(response.status);
        if(!response.ok) {
            return response.text().then(text => {
              throw new Error(text);
            });
        }
        else {
            navigate('/dashboard', { state: { name: name } });
        }
        return response.text();
    })
    
    .catch(error => {
        setError(error.message);
    })
     } else if (action === "Login") {
        //check if the user exists and is the right password
        setError("");
        fetch(`api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
         body: JSON.stringify({name: name, password : password})
      }).then(response => {
        //the user does not exist
        if(!response.ok) {
             return response.text().then(text => {
              throw new Error(text);
            });
        }
        else {
            navigate('/dashboard', { state: { name: name } });
        }
        return response.text();
      })
      .catch(error => {
        setError(error.message)
      } 
      )
     }
    }
  };

    return (
        <div className="page">
            <div className="bigtitle">
                To-Do List
            </div>
        <div className="container">
            <div className="header">
                <div className="title">
                    {action}      
                </div>
                <div className="underline">

                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    >    
                    </input>
                </div>
                <div className="input">
                    <input type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    > 
                    </input>
                </div>
                {error && <div className="error">{error}</div>}
            </div>
              
            <div className="submit-container">
                <div className={action==="Login" ? "submit gray" : "submit"} 
                onClick={()=>{
                    setAction("Sign Up")
                    handleSubmit();
                    }}>
                    Sign Up</div>
                <div className={action==="Sign Up"? "submit gray" : "submit"} 
                onClick={()=>{
                    setAction("Login")
                    handleSubmit()
                    }}>
                    Login</div>
            </div>
        </div> 
        </div>
    )
}

export default LoginRegister