import React from "react";
import ListPost from "./Posts/ListPost";
import Navbar from "./layout/Navbar";
// import axios from "axios";
// import jwt_decode from "jwt-decode";

const Home = () => {
  // const [name, setName] = useState("");
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   refreshToken();
  // }, []);

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3000/token");
  //     // console.log(res.data.message);
  //     setToken(res.data.accessToken);
  //     const decoded = jwt_decode(res.data.accessToken);
  //     console.log(decoded);
  //   } catch (err) {
  //     // console.log(err);
  //   }
  // };

  return (
    <>
      <Navbar />
      <ListPost />
    </>
  );
};

export default Home;
