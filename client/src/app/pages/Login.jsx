"use client";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dotenv from "dotenv";
import axios from "axios";
import { AuthContext } from "../context/authContext";
dotenv.config();

const Login = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(values);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="username"
          name="name"
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={onChange}
        />
        <button onClick={handleSubmit}>login</button>
        {error && <p>{error}</p>}
        <span>Don't you have an accounts</span>
        <Link to="/register" className="register">
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
