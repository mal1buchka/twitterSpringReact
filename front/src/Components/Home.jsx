import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Mine from "./Mine"; // Импортируем компонент Mine
import FollowingByMe from "./FollowingByMe"; // Импортируем компонент FollowingByMe

export default function Home() {
  // Состояние для отслеживания активной секции
  const [activeSection, setActiveSection] = useState("mine");

  // Функция для смены секции
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className="px-5 lg:px-8"
      sx={{
        width: "100%",
        height: "100vh",
        padding: 1,
        maxWidth: "1200px",
        margin: "0 auto",
        borderBottom: "none",
      }}
    >
      {/* Левая секция */}
      <Box
        className="w-full h-full lg:w-1/4 relative border-2 border-white p-1"
        sx={{ flex: 1 }}
      >
        <Navbar />
      </Box>

      {/* Правая секция с кнопками */}
      <Box
        className="w-full h-full lg:w-3/4 relative border-2 border-white"
        sx={{ flex: 2, borderBottom: "none" }}
      >
        {/* Кнопки для переключения контента */}
        <div className="flex justify-between items-center mb-4 border-b-2 border-white border-solid p-2">
          <button
            onClick={() => handleSectionChange("mine")}
            className={`flex-1 hover:text-blue-500 transition-all duration-300 ease-in-out transform ${
              activeSection === "mine"
                ? "text-black bg-white scale-95" // Уменьшаем размер активной кнопки
                : "text-white"
            } p-2 rounded-md`}
          >
            <p className="text-lg">Mine</p>
          </button>
          <div className="border-l-2 border-white h-6 mx-2" />{" "}
          {/* Линия между кнопками */}
          <button
            onClick={() => handleSectionChange("following")}
            className={`flex-1 hover:text-blue-500 transition-all duration-300 ease-in-out transform ${
              activeSection === "following"
                ? "text-black bg-white scale-95" // Уменьшаем размер активной кнопки
                : "text-white"
            } p-2 rounded-md`}
          >
            <p className="text-lg">Following by me</p>
          </button>
        </div>

        {/* Отображаем соответствующий контент в зависимости от активной секции */}
        <Box sx={{ padding: 2 }}>
          {activeSection === "mine" ? <Mine /> : <FollowingByMe />}
        </Box>
      </Box>
    </Box>
  );
}
