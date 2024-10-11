'use client'
import React, { useState } from "react";

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }
  return (
    <>
      <h3>Login component</h3>
      <div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="enter your username/email"
            onChange={handleInputChange}
            value={loginData.email}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="enter your password"
            onChange={handleInputChange}
            value={loginData.password}
          />
        </div>
        <div className="input-wrapper">
          <button className="button-wrapper">Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;
