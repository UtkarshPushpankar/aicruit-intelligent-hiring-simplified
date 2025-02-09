import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='border max-w-[40vw] m-auto border-gray-300 h-[9vh] rounded-xl mt-10 bg-white shadow-2xl navbar flex items-center justify-between '>

            <Link href={"/"}>
            <div className="logo-nav flex items-center gap-2">
                <img className='ml-4' width={50} src="AIcruit_nobg.png" alt="logo" />
                <div className="text">
                    <span className='uncial text-xl text-teal-400'>AI</span>
                    <span className='uncial text-xl text-lime-400'>cruit</span>
                </div>
            </div>
            </Link>


            <div className="menu-bar flex gap-8 items-center justify-between">
                <div className="links flex gap-8 font-semibold">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/about"}>About</Link>
                    <Link href={"/contact"}>Contact</Link>
                </div>

                <Link href={"/login"}>
                    <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 m-2 mr-5">Login</button>
                </Link>


            </div>

        </nav>
    )
}

export default Navbar
