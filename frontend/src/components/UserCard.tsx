import React, { useState } from "react";
import { User } from "../types/User";
import "./UserCard.css";

interface UserCardProps {
  mode: "login" | "create";
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setUsername: (name: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ mode, setPage, setUsername }) => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    confirmPassword: "",
    pokemonCount: 0,
    favorites: [],
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !user.username ||
      !user.password ||
      (mode === "create" && !user.confirmPassword)
    ) {
      setErrorMsg("Please fill out all fields.");
      return;
    }

    if (mode === "create" && user.password !== user.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      const endpoint = mode === "login" ? "/user/login" : "/user/register";
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        mode: "cors",
      });

      if (response.ok) {
        setUsername(user.username);
        setPage("Pokedex");
      } else {
        const errorText = await response.text();
        setErrorMsg(errorText);
      }
    } catch {
      setErrorMsg("Unable to send request.");
    }
  };

  return (
    <div className="user-card">
      <h3>{mode === "login" ? "Login" : "Create Account"}</h3>
      <i
        className={`fas ${
          mode === "login" ? "fa-user" : "fa-user-plus"
        } user-plus-icon`}
      ></i>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
        </div>
        {mode === "create" && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
            />
          </div>
        )}
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="button">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default UserCard;
