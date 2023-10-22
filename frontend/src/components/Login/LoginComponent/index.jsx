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
    navigate("/");
  };
  return (
    <>
      <h2 className="text-2xl font-bold text-center py-6">Login</h2>
      <form
        onSubmit={Auth}
        className="shadow-xl px-2 py-2 md:w-[800px] sm:w-[400px] mx-auto bg-black text-white rounded-lg"
      >
        <div className="px-2 py-2">
          <div className="font-bold py-2">
            <label>Username</label>
          </div>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded w-full text-black"
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
          <button className="bg-green-600 text-white py-2 px-5 rounded-lg flex items-center ">
            <AiOutlineLogin /> Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
