import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  // const { PostRegisterError } = useSelector((state) => state.PostReducer);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const RegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", {
        name: name,
        email: email,
        username: username,
        password: password,
        confirmpassword: confirmpassword,
      });
      navigate("/login");
      Swal.fire(
        "Sukses",
        "Berhasil daftar, silahkan masuk akun anda!",
        "success"
      );
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
    // dispatch(
    //   RegisterUser({
    //     name: name,
    //     username: username,
    //     email: email,
    //     password: password,
    //     confirmpassword: confirmpassword,
    //   })
    // );
    // if (!PostRegisterError) {
    //   setName("");
    //   setEmail("");
    //   setUsername("");
    //   setPassword("");
    //   setConfirmPassword("");
    // }
  };
  return (
    <>
      <h2 className="py-6 text-2xl font-bold text-center">Register</h2>
      <form
        onSubmit={RegisterSubmit}
        className="shadow-xl px-2 py-2 md:w-[800px] sm:w-[400px] mx-auto bg-black text-white rounded-lg"
      >
        <p className="text-center text-white">{msg}</p>
        <div className="px-2 py-2">
          <div className="py-2 font-bold">
            <label>Name</label>
          </div>
          <input
            type="text"
            name="name"
            className="w-full text-black rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <div className="py-2 font-bold">
            <label>Email</label>
          </div>
          <input
            type="email"
            name="email"
            className="w-full text-black rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <div className="py-2 font-bold">
            <label>Username</label>
          </div>
          <input
            type="text"
            name="username"
            className="w-full text-black rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <div className="py-2 font-bold">
            <label>Repeat Password</label>
          </div>
          <input
            type="password"
            name="confirmpassword"
            className="w-full text-black rounded"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <button className="flex items-center px-5 py-2 text-white bg-green-600 rounded-lg ">
            <AiOutlineUserAdd /> Register Now
          </button>
        </div>
      </form>
    </>
  );
};
