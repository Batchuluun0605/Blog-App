import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const api = "http://localhost:8800/api";
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${api}/auth/register`, values);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="name"
          onChange={onChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={onChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={onChange}
        />
        <button onClick={handleSubmit}>login</button>
        {error && <p>{error}</p>}
        <span>Do you have an accounts</span>
        <Link to="/login" className="register">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
