import React from "react";
import { ToastContainer, Zoom } from "react-toastify";
import LoginForm from "./components/loginForm";
import Cube from "./components/cube";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={2}
        transition={Zoom}
      /> */}
      <Cube />
    </div>
  );
}

export default App;
