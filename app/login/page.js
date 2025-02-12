import React from 'react'
import LoginNavbar from '@/components/LoginNavbar'
import LoginForm from "@/components/LoginForm"

const Login = () => {
  return (
    <div className="container flex flex-col gap-10 items-center justify-center ">
      <LoginNavbar />
      <LoginForm />
    </div>

  )
}

export default Login
