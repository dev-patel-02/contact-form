import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import ContactForm from "./componets/ContactForm";
import Navbar from "./componets/Navbar";
import Users from "./componets/Users";
import { ToastContainer } from "react-toastify";
import { axe } from "@axe-core/react";

function App() {
  return (
    <div className="mx-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/user" element={<Users />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

if (process.env.NODE_ENV !== "production") {
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000);
}
