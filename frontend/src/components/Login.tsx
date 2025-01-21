import React, { useState } from "react"
//import { useNavigate, Link } from "react-router-dom";
import "./Login.css"



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
            <form onSubmit= { handleLogin } method="post">
            <div className="mb-3">
                    <label htmlFor="email" className="form-label">Username </label>
                    <input onChange={e => {setUsername(e.target.value)}} type="username" className="form-control" id="username"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password </label>
                    <input onChange={e => {setPassword(e.target.value)}} type="password" className="form-control" id="password"/>
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">LOG IN</button>
            </form>
        </div>        
    );
    //<p style={{marginTop:"2vh"}}>Don't have an account?<Link to={'/register'}>Create an account</Link></p>
}; 

export default Login