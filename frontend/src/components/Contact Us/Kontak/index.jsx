import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../actions/contactAction";

const Kontak = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMessage({ name: name, email: email, message: message }));
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center py-6">Contact Us</h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="shadow-xl bg-black text-white px-2 py-2 md:w-[800px] sm:w-[400px] mx-auto rounded-lg"
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
            className="rounded w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="px-2 py-2">
          <div className="font-bold py-2">
            <label>Message</label>
          </div>
          <textarea
            className="rounded w-full text-black"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
        </div>
        <div className="px-2 py-2">
          <button className="bg-green-600 text-white py-2 px-5 rounded-lg flex items-center ">
            <AiOutlineSave /> Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Kontak;
