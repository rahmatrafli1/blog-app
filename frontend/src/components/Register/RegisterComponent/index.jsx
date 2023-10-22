import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RegisterUser } from "../../../actions/registerAction";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const RegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(
      RegisterUser({
        name: name,
        username: username,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
      })
    );
    navigate("/login");
  };
  return (
    <>
      <h2 className="text-2xl font-bold text-center py-6">Register</h2>
      <form
        onSubmit={(e) => RegisterSubmit(e)}
        className="shadow-xl px-2 py-2 md:w-[800px] sm:w-[400px] mx-auto bg-black text-white rounded-lg"
      >
        <div className="px-2 py-2">
          <div className="font-bold py-2">
            <label>Name</label>
          </div>
          <input
            type="text"
            name="name"
            className="rounded w-full text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <div className="font-bold py-2">
            <label>Email</label>
          </div>
          <input
            type="email"
            name="email"
            className="rounded w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <div className="font-bold py-2">
            <label>Username</label>
          </div>
          <input
            type="text"
            name="username"
            className="rounded w-full text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <div className="font-bold py-2">
            <label>Password</label>
          </div>
          <input
            type="password"
            name="password"
            className="rounded w-full text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <div className="font-bold py-2">
            <label>Repeat Password</label>
          </div>
          <input
            type="password"
            name="confirmpassword"
            className="rounded w-full text-black"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <button className="bg-green-600 text-white py-2 px-5 rounded-lg flex items-center ">
            <AiOutlineUserAdd /> Register Now
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
