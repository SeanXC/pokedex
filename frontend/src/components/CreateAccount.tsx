import React, { useState } from "react"
import { redirect } from "react-router-dom";
import "./CreateAccount.css"
import createaccount from '../assets/createaccount.png'

const CreateAccount:React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username == "" || password == "" || confirmPassword == "") {
            setErrorMsg("Please fill out all fields.");
        } else if (password != confirmPassword) {
            setErrorMsg("Passwords do not match.");
        } else {
            try {
                let host = window.location.hostname;
                const response = await fetch(host + "/register", {
                    body: JSON.stringify({ username: username,
                                           email:"",
                                           password:password,
                                           confirmPassword:confirmPassword,
                                           pokeMonCount:0,
                                           favorites:[]})
                });

                if(response.ok) {
                    redirect('/home');
                } else {
                    //error handling 
                }


            } catch (error) {
                setErrorMsg("Unable to send request.");
            }
       }
    }

    return(
        <div className="create-account-container">
            <h4 className="ca-header">Create Account</h4>
            <img src={createaccount} className="account-img"></img>
            <form onSubmit= { handleCreate } method="post" className="ca-input-form">
                <div className="fields">
                        <label htmlFor="username" className="form-label">Username </label>
                        <input onChange={e => {setUsername(e.target.value); setErrorMsg("");}} type="username" className="form-control" id="username"/>
    
                        <label htmlFor="password" className="form-label">Password </label>
                        <input onChange={e => {setPassword(e.target.value); setErrorMsg("");}} type="password" className="form-control" id="password"/>
    
                        <label htmlFor="confirm-password" className="form-label">Confirm Password </label>
                        <input onChange={e => {setConfirmPassword(e.target.value); setErrorMsg("");}} type="password" className="form-control" id="confirm-password"/>
                </div>
                <p className="problem-field">{errorMsg}</p>
                <button type="submit" className="create-account-btn">CREATE ACCOUNT</button>
            </form>
        </div>  
    );
}; 

export default CreateAccount;