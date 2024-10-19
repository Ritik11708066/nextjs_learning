"use client";
import local from "next/font/local";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

function SignUp() {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    restrauntName: "",
    address: "",
    city: "",
    contact: "",
  });

  const [formDataError, setFormDataError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    restrauntName: "",
    address: "",
    city: "",
    contact: "",
  });

  const [isError, setError] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validatePhoneNo = (number) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(number);
  };

  const checkValidation = (value) => {
    console.log("inside check validation", value.length);
    return value.length === 0 ? false : true;
  };

  const validateField = (value, fieldName) => {
    console.log("inside validate field method", value, fieldName);
    switch (fieldName) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "confirmPassword":
        return validateConfirmPassword(signupData.password, value);
      case "contact":
        return validatePhoneNo(value);
      case "restrauntName":
        return checkValidation(value);
      case "address":
        return checkValidation(value);
      case "city":
        return checkValidation(value);
      default:
        return true;
    }
  };

  const customErrorMessage = (fieldName) => {
    switch (fieldName) {
      case "email":
        return "email is not correct";
      case "password":
        return "password length: min 5 chars required";
      case "confirmPassword":
        return "password does not match";
      case "contact":
        return "phone no is not valid";
      case "city":
        return "phone no is not valid";
      case "address":
        return "address is required";
      case "restrauntName":
        return "restraunt name is required";
      default:
        return "";
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setSignupData({
      ...signupData,
      [name]: value,
    });

    const tempError = { ...formDataError };

    if(value.length === 0){
      tempError[name] = `${name} is required`
    } else if (!validateField(value,name)){
      tempError[name] = customErrorMessage(name)
    } else {
      tempError[name] = ""
    }

    setFormDataError(tempError)

    if (Object.values(tempError).some((error) => error !== "")) {
      setError(true); // If any field has an error, set isError to true
    } else {
      setError(false); // No errors, so set isError to false
    }
  };

  const handldeOnFocus = (e) => {
    console.log("isnide focus method");
    const { name, value } = e.target;
    if (!value.length) {
      setFormDataError({
        ...formDataError,
        [name]: `${name} is required`,
      });
      setError(true);
    }
  };

  // function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('clicked')

    if(!isError){
      try {
        // calling post api with the payload
        const res = await fetch("http://localhost:3000/api/restraunt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });
  
        const response = await res.json();
        console.log("from the post request", response);
  
        if (response.success) {
          console.log("user registered successfully");
          alert("Restraunt registered successfully");
  
          // first we will delete the password from our resposne
          // then we will save our data into local storage.
  
          const { result } = response;
          delete result.password;
          localStorage.setItem("restraunt", JSON.stringify(result));
  
          // after successfull registration we will redirect to dasboard.
          router.push("/restraunt/dashboard");
        }
      } catch (error) {
        console.log("error signup", error);
      }
    }
  };

  // console.log("error obj", formDataError);
  console.log("is error", isError);

  return (
    <>
      <h3>Signup component</h3>
      <div>
        <div className="input-wrapper">
          <input
            name="email"
            className="input-field"
            type="text"
            placeholder="enter username/email"
            onChange={handleInputChange}
            value={signupData.email}
            onFocus={handldeOnFocus}
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
            type="password"
            placeholder="enter password"
            onChange={handleInputChange}
            value={signupData.password}
            onFocus={handldeOnFocus}
          />
          {formDataError?.password?.length ? (
            <div style={{ color: "red" }}>{formDataError?.password}</div>
          ) : (
            ""
          )}
        </div>
        <div className="input-wrapper">
          <input
            name="confirmPassword"
            className="input-field"
            type="password"
            placeholder="confirm password"
            onChange={handleInputChange}
            value={signupData.confirmPassword}
            onFocus={handldeOnFocus}
          />
          {formDataError?.confirmPassword?.length ? (
            <div style={{ color: "red" }}>{formDataError?.confirmPassword}</div>
          ) : (
            ""
          )}
        </div>
        <div className="input-wrapper">
          <input
            name="restrauntName"
            className="input-field"
            type="text"
            placeholder="enter restraunt name"
            onChange={handleInputChange}
            value={signupData.restrauntName}
            onFocus={handldeOnFocus}
          />
          {formDataError?.restrauntName?.length ? (
            <div style={{ color: "red" }}>{formDataError?.restrauntName}</div>
          ) : (
            ""
          )}
        </div>
        <div className="input-wrapper">
          <input
            name="address"
            className="input-field"
            type="text"
            placeholder="enter address"
            onChange={handleInputChange}
            value={signupData.address}
            onFocus={handldeOnFocus}
          />
          {formDataError?.address?.length ? (
            <div style={{ color: "red" }}>{formDataError?.address}</div>
          ) : (
            ""
          )}
        </div>
        <div className="input-wrapper">
          <input
            name="city"
            className="input-field"
            type="text"
            placeholder="enter city"
            onChange={handleInputChange}
            value={signupData.city}
            onFocus={handldeOnFocus}
          />
          {formDataError?.city?.length ? (
            <div style={{ color: "red" }}>{formDataError?.city}</div>
          ) : (
            ""
          )}
        </div>
        <div className="input-wrapper">
          <input
            name="contact"
            className="input-field"
            type="text"
            placeholder="enter phone no"
            onChange={handleInputChange}
            value={signupData.contact}
            onFocus={handldeOnFocus}
          />
          {formDataError?.contact?.length ? (
            <div style={{ color: "red" }}>{formDataError?.contact}</div>
          ) : (
            ""
          )}
        </div>
        <div className="input-wrapper">
          <button onClick={(e) => {
            if(!isError){
              handleSignup(e)
            }
          }
            } className={isError ? 'button-wrapper-error' : 'button-wrapper'}
            >
            Signup
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
