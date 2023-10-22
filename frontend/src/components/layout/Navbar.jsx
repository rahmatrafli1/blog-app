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
    <div className="shadow-md w-full sticky">
      <div className="md:flex items-center justify-between bg-black text-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center hover:text-gray-500">
          <span className="text-3xl text-orange-600 mr-1">
            <BiLogoBlogger />
          </span>
          Blog App
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <AiOutlineClose /> : <BsList />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-8 absolute md:static bg-black md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all ease-in ${
            open ? "top-[4em]" : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-xl hover:text-gray-500 md:my-0 my-7"
            >
              <Link to={link.link} className="flex cursor-pointer items-center">
                <span className="text-xl mr-2">{link.icon}</span> {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
