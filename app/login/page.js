"use client";
import React, { useState } from "react";
import LoginNavbar from "@/components/LoginNavbar";
import LoginForm from "@/components/LoginForm";

const Login = () => {

  return (
    <div className="container flex flex-col gap-6 items-center justify-center">
      <LoginNavbar />
      
      <LoginForm />
    </div>
  );
};

export default Login;
