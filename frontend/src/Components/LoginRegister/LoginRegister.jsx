import React from "react";
import './LoginRegister.css'
const LoginRegister = () => {
    return (
        <div className="page">
            <div className="bigtitle">
                To-Do List
            </div>
        <div className="container">
            <div className="header">
                <div className="title">
                    Login or Register User        
                </div>
                <div className="underline">

                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" placeholder="Name"></input>
                </div>
                <div className="input">
                    <input type="password" placeholder="Password"></input>
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
            </div>
        </div> 
        </div>
    )
}

export default LoginRegister