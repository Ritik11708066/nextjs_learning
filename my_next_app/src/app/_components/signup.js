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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });

    switch (name) {
      case "email":
        setFormDataError({
          ...formDataError,
          email:
            value.length !== 0
              ? validateEmail(value)
                ? ""
                : "email is not correct"
              : "",
        });
        break;
      case "password":
        setFormDataError({
          ...formDataError,
          password:
            value.length !== 0
              ? validatePassword(value)
                ? ""
                : "password length should be greater than equal to 5"
              : "",
        });
        break;
      case "confirmPassword":
        setFormDataError({
          ...formDataError,
          confirmPassword:
            value.length !== 0
              ? validateConfirmPassword(signupData.password, value)
                ? ""
                : "password dont match"
              : "",
        });
        break;
      case "restrauntName":
        setFormDataError({
          ...formDataError,
          restrauntName: value.length !== 0 ? "" : "please enter the name",
        });
        break;
      case "address":
        setFormDataError({
          ...formDataError,
          address: value.length !== 0 ? "" : "please enter address",
        });
      case "city":
        setFormDataError({
          ...formDataError,
          city: value.length !== 0 ? "" : "please enter the city",
        });
        break;
      case "contact":
        setFormDataError({
          ...formDataError,
          contact: validatePhoneNo(value) ? "" : "please enter the name",
        });
        break;
      default:
        break;
    }
  };

  // function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

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
  };

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
          />
          {formDataError?.email.length ? (
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
          />
          {formDataError?.password.length ? (
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
          />
          {formDataError?.confirmPassword.length ? (
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
          />
          {formDataError?.restrauntName.length ? (
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
          />
          {formDataError?.address.length ? (
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
          />
          {formDataError?.city.length ? (
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
          />
          {formDataError?.contact.length ? (
            <div style={{ color: "red" }}>{formDataError?.contact}</div>
          ) : (
            ""
          )}
        </div>
        <div className="input-wrapper">
          <button onClick={(e) => handleSignup(e)} className="button-wrapper">
            Signup
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
