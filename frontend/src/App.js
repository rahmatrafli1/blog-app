import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import DetailPostTrue from "./components/Posts/ListPost/DetailPostTrue";
import LoginComp from "./components/Login";
import RegisterComp from "./components/Register";
import PostComp from "./components/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post/detailpost/:id" element={<DetailPostTrue />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/post" element={<PostComp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
