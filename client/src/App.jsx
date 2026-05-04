import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import OTPVerify from "./pages/OTPVerify";
import Dashboard from "./pages/Dashboard";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<OTPVerify />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;