import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PostAll = () => {
  // eslint-disable-next-line
  const [name, setName] = useState("");
  // eslint-disable-next-line
  const [token, setToken] = useState("");
  // eslint-disable-next-line
  const [expired, setExpired] = useState("");
  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpired(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
        Swal.fire("Gagal!", error.response.data.message, "error");
        // console.log(error);
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expired * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:3000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpired(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getPost = async () => {
    const response = await axiosJWT.get("http://localhost:3000/posts/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  return (
    <>
      <div className="py-4">
        <h1 className="text-2xl font-bold text-center">
          Welcome back {name} in Post Page
        </h1>
        <button
          onClick={getPost}
          className="flex items-center px-3 py-3 mx-auto my-3 text-white bg-blue-500 rounded hover:scale-125 hover:duration-500"
        >
          Get Post
        </button>
      </div>
    </>
  );
};

export default PostAll;
