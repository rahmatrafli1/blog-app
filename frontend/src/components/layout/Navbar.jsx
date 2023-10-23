import React, { useState } from "react";
import { BiLogoBlogger, BiSolidContact } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsInfoCircle, BsList } from "react-icons/bs";
import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdLogin, MdOutlineLocalPostOffice } from "react-icons/md";

const Navbar = () => {
  let links = [
    { name: "Home", link: "/", icon: <AiOutlineHome /> },
    { name: "About", link: "/about", icon: <BsInfoCircle /> },
    { name: "Contact", link: "/contact", icon: <BiSolidContact /> },
    { name: "Post", link: "/post", icon: <MdOutlineLocalPostOffice /> },
    { name: "Login", link: "/login", icon: <MdLogin /> },
    { name: "Register", link: "/register", icon: <AiOutlineUserAdd /> },
    { name: "Logout", link: "/logout", icon: <AiOutlineLogout /> },
  ];

  const [open, setOpen] = useState(false);
  return (
    <div className="sticky w-full shadow-md">
      <div className="items-center justify-between py-4 text-white bg-black md:flex md:px-10 px-7">
        <Link to="/">
          <div className="flex items-center text-2xl font-bold cursor-pointer hover:text-gray-500">
            <span className="mr-1 text-3xl text-orange-600">
              <BiLogoBlogger />
            </span>
            <span className="sm:hidden md:block">Blog App</span>
          </div>
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="absolute duration-150 cursor-pointer right-8 top-6 md:hidden"
        >
          {open ? <AiOutlineClose /> : <BsList />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-8 absolute md:static bg-black md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all ease-in ${
            open ? "top-[3.5em]" : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li
              key={link.name}
              className="text-xl md:ml-8 hover:text-gray-500 md:my-0 my-7"
            >
              <Link to={link.link} className="flex items-center cursor-pointer">
                <span className="mr-2 text-xl">{link.icon}</span> {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
