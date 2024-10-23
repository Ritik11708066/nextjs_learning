"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [formDataError, setFormDataError] = useState({
    email: "",
    password: "",
  });

  const [isError, setError] = useState(false);
  const router = useRouter();

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value);
  };
  const validatePassword = (value) => {
    return value.length >= 5;
  };

  const validateField = (value, fieldName) => {
    switch (fieldName) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      default:
        return true;
    }
  };

  const handleCustomErrorMessage = (fieldName) => {
    switch (fieldName) {
      case "email":
        return "email is incorrect";
      case "password":
        return "min 5 or more characters required";
      default:
        return "";
    }
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    const tempError = { ...formDataError };
    if (!value.length) {
      tempError[name] = `${name} is required`;
    } else if (!validateField(value, name)) {
      tempError[name] = handleCustomErrorMessage(name);
    } else {
      tempError[name] = "";
    }
    setFormDataError(tempError);

    if (Object.values(tempError).some((error) => error !== "")) {
      setError(true); // If any field has an error, set isError to true
    } else {
      setError(false); // No errors, so set isError to false
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const {email, password} = loginData
    let tempError= false

    function handleErr(fieldname){
      tempError = true
      setFormDataError({...formDataError, [fieldname]: `${fieldname} is required`})
      setError(true)
    }

    if(!email){
     handleErr('email')
    }
    if(!password){
      handleErr('password')
    }
    if (!tempError) {
      try {
        const data = await fetch("http://localhost:3000/api/restraunt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...loginData, login: true }),
        });
        const res = await data.json();
        if (res.success) {
          alert(res.message);
          const {result} = res
          delete result.password
          localStorage.setItem('restraunt', JSON.stringify(result))
          router.push("/restraunt/dashboard");
        } else {
          alert(`${res.message}`);
        }
      } catch (error) {}
    }
  };

  const handleOnFocus = (event) => {
    const { name, value } = event.target;
    if (!value.length) {
      setFormDataError({
        ...formDataError,
        [name]: `${name} is required`,
      });
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <>
      <h3>Login component</h3>
      <div>
        <div className="input-wrapper">
          <input
            name="email"
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
            name="password"
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
          <button
            onClick={(e) => {
              if (!isError) {
                handleLogin(e);
              }
            }}
            className={isError ? "button-wrapper-error" : "button-wrapper"}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
