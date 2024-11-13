import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Для перенаправления
import axios from "axios"; // Убедитесь, что axios правильно импортирован
import email_icon from "../assets/email.svg";
import password from "../assets/password.svg";

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Видимость пароля
  const [error, setError] = useState(null); // Ошибки
  const [loading, setLoading] = useState(false); // Статус загрузки

  const navigate = useNavigate(); // Хук для навигации

  // Обновление состояния при изменении полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Очистка ошибок перед отправкой
    setLoading(true); // Включаем загрузку

    try {
      // Отправка данных с помощью axios
      const response = await axios.post("http://localhost:8080/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,  // Включаем отправку cookies (аналог credentials: "include")
      });

      if (response.status === 200) {
        const { token } = response.data;
        console.log(token);
        
        localStorage.setItem("jwtToken", token); // Сохранение токена в localStorage
        setLoading(false);
        navigate("/home"); // Перенаправление на главную страницу после успешного входа
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError("Произошла ошибка, попробуйте снова");
      setLoading(false);
    }
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

      {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Показываем ошибку */}

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-4">
          <div className="flex justify-between">
            <label className="block text-gray-300 mb-1" htmlFor="username">
              Username
            </label>
            <img
              src={email_icon}
              alt="email_icon"
              className="w-6 h-6 bg-slate-300 rounded-lg"
            />
          </div>

          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white"
            required
            placeholder="username..."
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex justify-between">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Пароль
            </label>
            <img
              src={password}
              alt="password_icon"
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
          disabled={loading} // Отключаем кнопку, пока идет загрузка
        >
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </form>

      <div>
        <p className="text-sm">Забыли пароль?</p>
        <a className="text-sm hover:bg-blue-700" href="/reset-password">
          Восстановить пароль
        </a>
      </div>
    </div>
  );
}
