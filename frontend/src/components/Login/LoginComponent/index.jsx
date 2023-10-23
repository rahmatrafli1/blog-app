import React, { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../actions/loginAction";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const Auth = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        username: username,
        password: password,
      })
    );
    navigate("/post");
  };
  return (
    <>
      <h2 className="py-6 text-2xl font-bold text-center">Login</h2>
      <form
        onSubmit={Auth}
        className="shadow-xl px-2 py-2 md:w-[800px] sm:w-[400px] mx-auto bg-black text-white rounded-lg"
      >
        <div className="px-2 py-2">
          <div className="py-2 font-bold">
            <label>Username</label>
          </div>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-black rounded"
          />
        </div>
        <div className="px-2 py-2">
          <div className="py-2 font-bold">
            <label>Password</label>
          </div>
          <input
            type="password"
            name="password"
            className="w-full text-black rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <button className="flex items-center px-5 py-2 text-white bg-green-600 rounded-lg ">
            <AiOutlineLogin /> Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
