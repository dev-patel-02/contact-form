import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ContactForm from "./componets/ContactForm";
import Navbar from "./componets/Navbar";
import Users from "./componets/Users";
import { ToastContainer } from "react-toastify";
import FileView from "./componets/FileView";

function App() {
  const [fileUrl, setFileUrl] = useState(null);

  return (
    <div className="mx-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<ContactForm setFileUrl={setFileUrl} />} />
        <Route path="/user" element={<Users fileUrl={fileUrl} />} />
        <Route path="/f" element={<FileView fileUrl={fileUrl} />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

// if (process.env.NODE_ENV !== "production") {
//   const axe = require("@axe-core/react");
//   axe(React, ReactDOM, 1000);
// }
