import React from "react";
import "./CSS/app.css";
import SignInSignUp from "./Components/SignInSignUp";
import Home from "./Components/Home"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/api/v1/home" element={<Home />} />{" "}
          {/* Это добавит маршрут по умолчанию */}
          <Route path="api/v1/auth" element={<SignInSignUp />} />
        </Routes>
      </Router>
    </div>
  );
}
