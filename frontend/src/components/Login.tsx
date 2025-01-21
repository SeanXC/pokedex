import React, { useState } from "react"
//import { useNavigate, Link } from "react-router-dom";
import "./Login.css"
import login from "../assets/login.png"



const Login:React.FC = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('email: ' + username + ' password: ' + password);
            //succesful login 
        } catch (error) {
            //something went wrong 
        }
    }


    return(
        <div className="login-container">
            <h4>Login</h4>
            <img src={login} className="login-img"></img>
            <form onSubmit= { handleLogin } method="post" className="input-form">
                <div className="fields">
                        <label htmlFor="email" className="form-label">Username </label>
                        <input onChange={e => {setUsername(e.target.value)}} type="username" className="form-control" id="username"/>
                        <label htmlFor="password" className="form-label">Password </label>
                        <input onChange={e => {setPassword(e.target.value)}} type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="login-btn">LOG IN</button>
            </form>
        </div>        
    );
    //<p style={{marginTop:"2vh"}}>Don't have an account?<Link to={'/register'}>Create an account</Link></p>
}; 

export default Login