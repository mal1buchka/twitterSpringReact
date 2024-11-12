import React, { useState } from "react";
import Home from "./Home";
import email_icon from "../assets/email.svg";
import password from "../assets/password.svg";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Видимость пароля

  // Обновление состояния при изменении полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // Функция для смены видимости пароля
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md relative">
      <p className="text-center mb-3 text-lg font-semibold text-white">Вход</p>

      <div className="text-center text-gray-400 mb-2">
        Здесь должна была быть Google Oauth, Гык
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <div className="flex justify-between">
            <label className="block text-gray-300 mb-1" htmlFor="email">
              Email
            </label>
            <img
              src={email_icon}
              alt="email_icon"
              className="w-6 h-6 bg-slate-300 rounded-lg"
            />
          </div>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white"
            required
            placeholder="@email.com..."
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex justify-between">
            {" "}
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Пароль
            </label>
            <img
              src={password}
              alt="email_icon"
              className="w-6 h-6 bg-slate-300 rounded-lg"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Переключаем тип между "text" и "password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2  border border-gray-500 rounded bg-gray-700 text-white"
              required
              placeholder="password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-colors mb-4"
        >
          Войти
        </button>
      </form>
      <div>
        <p className="text-sm">Забыли пароль?</p>
        <a className="text-sm hover:bg-blue-700" href={Home}>
          Восстановить пароль
        </a>
      </div>
    </div>
  );
}
