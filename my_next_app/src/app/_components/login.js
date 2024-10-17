'use client'
import React, { useState } from "react";

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [formDataError, setFormDataError] = useState({
      email: '',
      password: ''
    })

    const [isError, setError] = useState(false)

    const validateEmail = (value) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(value);
    }
    const validatePassword = (value) => {
      return value.length >= 5;
    }

    const validateField = (value, fieldName) => {
      switch(fieldName){
        case 'email':
          return validateEmail(value)
        case 'password':
          return validatePassword(value)
        default:
          return true
      }
    }

    const handleCustomErrorMessage = (fieldName) => {
      switch(fieldName){
        case 'email':
          return 'email is incorrect'
        case 'password':
          return 'min 5 or more characters required'
        default:
          return ''
      }
    }

    function handleInputChange(event){
      const {name, value} = event.target
        setLoginData({
            ...loginData,
            [name]: value
        })

        const tempError = {...formDataError}
        if(!value.length){
          tempError[name] = `${name} is required`
        } else if (!validateField(value,name)){
          tempError[name] = handleCustomErrorMessage(name)
        } else {
          tempError[name] = ''
        }
        setFormDataError(tempError)

        if (Object.values(tempError).some((error) => error !== "")) {
          setError(true); // If any field has an error, set isError to true
        } else {
          setError(false); // No errors, so set isError to false
        }

    }

    const handleOnFocus = (event) => {
      const {name, value} = event.target
      if(!value.length){
        setFormDataError({
          ...formDataError,
          [name]: `${name} is required`
        })
        setError(true)
      } else {
        setError(false)
      }
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
            onFocus={handleOnFocus}
          />
          {formDataError?.email?.length ? (
            <div style={{ color: "red" }}>{formDataError?.email}</div>
          ) : (
            ""
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="enter your password"
            onChange={handleInputChange}
            value={loginData.password}
            onFocus={handleOnFocus}
          />
           {formDataError?.password?.length ? (
            <div style={{ color: "red" }}>{formDataError?.password}</div>
          ) : (
            ""
          )}
        </div>
        <div className="input-wrapper">
          <button className="button-wrapper">Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;
