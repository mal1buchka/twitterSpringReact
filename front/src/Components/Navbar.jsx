import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import user_icon from "../assets/user.svg";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // Определяем текущий маршрут
  const navigate = useNavigate(); // Хук для навигации

  const handleLogout = () => {
    // Удаляем токен из localStorage
    localStorage.clear();

    // Переходим на страницу регистрации
    navigate("/register");
  };
  const token = localStorage.getItem("jwtToken");
  console.log(token);
  const [username, setUsername] = useState("Name here");
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Декодируем токен
        console.log(decodedToken); // Выводим для отладки
        setUsername(decodedToken.sub || "Name here"); // Устанавливаем имя пользователя
      } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
      }
    }
  }, [token]);

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md relative">
      {/* Основная навигация */}
      <nav className="w-full mb-4">
        <Link
          to="/home"
          className="flex items-center justify-center hover:text-blue-500 active:text-blue-700"
        >
          <img
            src="/twitter.svg" // Путь к изображению относительно папки public
            alt="twitter_icon"
            className="w-12 h-12"
          />
          <p className="ml-2 text-white">Tipa Twitter</p>
        </Link>
      </nav>

      {/* Ссылки на разделы */}
      <div className="space-y-4">
        {/* My User */}
        <Link
          to="/user"
          className={`block p-2 text-lg rounded-md transition-colors hover:text-blue-500`}
        >
          My User
        </Link>

        {/* My Followers */}
        <div className="border-t border-gray-600"></div>
        <Link
          to="/api/v1/followers"
          className={`block p-2 text-lg rounded-md transition-colors ${
            location.pathname === "/api/v1/followers"
              ? "bg-white text-black"
              : "text-white"
          } hover:text-blue-500`}
        >
          My Followers
        </Link>

        {/* Find User */}
        <div className="border-t border-gray-600"></div>
        <Link
          to="/api/v1/find-user"
          className={`block p-2 text-lg rounded-md transition-colors ${
            location.pathname === "/api/v1/find-user"
              ? "bg-white text-black"
              : "text-white"
          } hover:text-blue-500`}
        >
          Find User
        </Link>

        {/* SMS */}
        <div className="border-t border-gray-600"></div>
        <Link
          to="/api/v1/sms"
          className={`block p-2 text-lg rounded-md transition-colors ${
            location.pathname === "/api/v1/sms"
              ? "bg-white text-black"
              : "text-white"
          } hover:text-blue-500`}
        >
          SMS
        </Link>

        {/* Notifications */}
        <div className="border-t border-gray-600"></div>
        <Link
          to="/api/v1/notifications"
          className={`block p-2 text-lg rounded-md transition-colors ${
            location.pathname === "/api/v1/notifications"
              ? "bg-white text-black"
              : "text-white"
          } hover:text-blue-500`}
        >
          Notifications
        </Link>

        {/* Logout */}
        <div className="border-t border-gray-600"></div>
        <button
          onClick={handleLogout}
          className={`block p-2 text-lg rounded-md transition-colors ${
            location.pathname === "/register"
              ? "bg-white text-black"
              : "text-white"
          } hover:text-blue-500`}
        >
          Logout
        </button>
        <div className="border-t border-gray-600"></div>
        <Link
          to="/api/v1/about"
          className={`block p-2 text-lg rounded-md transition-colors ${
            location.pathname === "/api/v1/about"
              ? "bg-white text-black"
              : "text-white"
          } hover:text-blue-500`}
        >
          About
        </Link>
        <div className="border-t border-gray-600 flex gap-5 p-1 items-center h-20">
          <img src={user_icon} alt="user_icon" className="h-10 w-10" />
          <p>Имя пользователя: {username}</p>
        </div>
      </div>
    </div>
  );
}
