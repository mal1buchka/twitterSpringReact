import React, { useState } from "react";
import user_icon from "../assets/user.svg";
import email_icon from "../assets/email.svg";
import password_icon from "../assets/password.svg";
import age_icon from "../assets/age.svg";
import malefemale_icon from "../assets/male-and-female.svg";
import background from "../assets/backgroundSignIn.jpg";
import { Box } from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function SignInSignUp() {
  const [activeSection, setActiveSection] = useState("SignUp");
  const handleSectionChange = (section) => {
    setActiveSection(section);
  }
  return (
    <div className="w-screen h-screen p-2">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className="px-5 lg:px-8"
        sx={{
          width: "100%",
          height: "95vh",
          padding: 2,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Box className="w-full h-full lg:w-3/5 relative border-2 border-white">
          <img src={background} alt="background_image" />
        </Box>
        <Box className="w-full h-full lg:w-2/5 relative border-2 border-white">
        <div className="flex justify-between items-center mb-1 border-b-2 border-white border-solid p-2">
          <button
            onClick={() => handleSectionChange("SignUp")}
            className={`flex-1 hover:text-blue-500 transition-all duration-300 ease-in-out transform ${
              activeSection === "SignUp"
                ? "text-black bg-white scale-95" // Уменьшаем размер активной кнопки
                : "text-white"
            } p-2 rounded-md`}
          >
            <p className="text-lg">Sign-up</p>
          </button>
          <div className="border-l-2 border-white h-6 mx-2" /> {/* Линия между кнопками */}
          <button
            onClick={() => handleSectionChange("SignIn")}
            className={`flex-1 hover:text-blue-500 transition-all duration-300 ease-in-out transform ${
              activeSection === "SignIn"
                ? "text-black bg-white scale-95" // Уменьшаем размер активной кнопки
                : "text-white"
            } p-2 rounded-md`}
          >
            <p className="text-lg">Sign-in</p>
          </button>
        </div>
          {activeSection === "SignUp" ? <SignUp /> : <SignIn />}
        </Box>
      </Box>
      
    </div>
  );
}
