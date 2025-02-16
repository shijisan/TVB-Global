"use client"

import { FaBars } from "react-icons/fa";

export default function Navbar() {
    return (
        <>
            <nav className="w-full top-0 left-0 z-50 fixed bg-maroon text-white px-4">
                <div className="h-[10vh] w-full flex max-w-6xl mx-auto items-center justify-between">
                    <div className="flex items-center">
                        <img className="size-[8vh] me-2 drop-shadow" src="/logo.webp" alt="Logo of The VA BAR" />
                        <h1 className="md:text-4xl text-3xl font-semibold poppins drop-shadow text-mustard">The VA BAR</h1>
                    </div>
                    <input type="checkbox" id="menu-toggle" className="hidden peer" />
                    <label htmlFor="menu-toggle" className="lg:hidden text-white text-2xl cursor-pointer">
                        <FaBars />
                    </label>
                    <ul className="lg:flex hidden peer-checked:flex flex-col lg:flex-row font-medium items-center space-x-4 fixed lg:static top-[10vh] left-0 w-full lg:w-auto bg-black bg-opacity-50 lg:bg-transparent h-[90vh] lg:h-auto justify-evenly text-white lg:text-inherit">
                        <li><a className="p-2 rounded bg-white bg-opacity-0 hover:bg-opacity-10 transition-all" href="/">Home</a></li>
                        <li><a className="p-2 rounded bg-white bg-opacity-0 hover:bg-opacity-10 transition-all" href="/">About</a></li>
                        <li><a className="p-2 rounded bg-white bg-opacity-0 hover:bg-opacity-10 transition-all" href="/">Courses</a></li>
                        <li><a className="p-2 rounded bg-white bg-opacity-0 hover:bg-opacity-10 transition-all" href="/">Contacts</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
