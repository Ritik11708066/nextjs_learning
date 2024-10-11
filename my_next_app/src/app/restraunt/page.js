"use client";

import React, { useState } from "react";
import Login from "../_components/login";
import SignUp from "../_components/signup";
import RestrauntHeader from "../_components/restraunt_header";
import "./style.css";
import RestrauntFooter from "../_components/RestrauntFooter";

function Restraunt(props) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <RestrauntHeader />
      <div className="container">
        {isLogin ? <Login /> : <SignUp />}
        <div className="signup-login-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "don't have account? Signup here"
            : "Already have an account ? Login here"}
        </div>
      </div>
      <RestrauntFooter />
    </>
  );
}

export default Restraunt;
