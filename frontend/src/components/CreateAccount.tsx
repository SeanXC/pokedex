import React, { useState } from "react"
import "./CreateAccount.css"
import createaccount from '../assets/createaccount.png'

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
            <h4 className="ca-header">Create Account</h4>
            <img src={createaccount} className="account-img"></img>
            <form onSubmit= { handleCreate } method="post" className="ca-input-form">
                <div className="fields">
                        <label htmlFor="username" className="form-label">Username </label>
                        <input onChange={e => {setUsername(e.target.value)}} type="username" className="form-control" id="username"/>
    
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={e => {setEmail(e.target.value)}} type="email" className="form-control" id="email"/>
    
                        <label htmlFor="password" className="form-label">Password </label>
                        <input onChange={e => {setPassword(e.target.value)}} type="password" className="form-control" id="password"/>
    
                        <label htmlFor="confirm-password" className="form-label">Confirm Password </label>
                        <input onChange={e => {setConfirmPassword(e.target.value)}} type="password" className="form-control" id="confirm-password"/>
                </div>
                <button type="submit" className="create-account-btn">CREATE ACCOUNT</button>
            </form>
        </div>  
    );
}; 

export default CreateAccount;