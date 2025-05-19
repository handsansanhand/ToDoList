import React, { useState } from "react";
import './LoginRegister.css'

/*React web app which handles functionality for signing up users and them logging in*/
const LoginRegister = () => {

    const [action, setAction] = useState("Sign Up");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //if the name or password is empty, or the api returns a failed request, then throw an error
    const handleSubmit = () => {
    if (!name || !password) {
      setError("Name and Password cannot be empty.");
    } else {
      setError("");
      // here send a fetch() call to the backend later
      alert(`${action} successful for user: ${name}`);
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