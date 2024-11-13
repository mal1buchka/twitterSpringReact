import React from "react";
import "./CSS/app.css";
import SignInSignUp from "./Components/SignInSignUp";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar"; // Убедитесь, что путь правильный
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserInfo from "./Components/UserInfo";

export default function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />{" "}
          {/* Это добавит маршрут по умолчанию */}
          <Route path="/register" element={<SignInSignUp />} />
          <Route path="/user" element={<UserInfo />} />
        </Routes>
      </Router>
    </div>
  );
}
