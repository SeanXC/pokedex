import React, { useState } from "react"
import "./CreateAccount.css"

const CreateAccount:React.FC = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('email: ' + email + ' password: ' + password);
            //succesful login 
        } catch (error) {
            //something went wrong 
        }
    }

    return(
        <div className="create-account-container">
            <h4>Create Account</h4>
            <form onSubmit= { handleCreate } method="post">
                <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username </label>
                        <input onChange={e => {setUsername(e.target.value)}} type="username" className="form-control" id="username"/>
                </div>
                <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <br></br>
                        <input onChange={e => {setEmail(e.target.value)}} type="email" className="form-control" id="email"/>
                </div>
                <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password </label>
                        <input onChange={e => {setPassword(e.target.value)}} type="password" className="form-control" id="password"/>
                </div>
                <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password </label>
                        <input onChange={e => {setConfirmPassword(e.target.value)}} type="password" className="form-control" id="confirm-password"/>
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">CREATE ACCOUNT</button>
            </form>
        </div>  
    );
}; 

export default CreateAccount;