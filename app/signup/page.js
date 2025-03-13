import LoginNavbar from '@/components/LoginNavbar'
import Signup from '@/components/Signup'
import React from 'react'

const signup = () => {
  return (
    <div className="container flex flex-col gap-6 items-center justify-center">
      <LoginNavbar /> 
      
      <Signup />
    </div>
  )
}

export default signup
