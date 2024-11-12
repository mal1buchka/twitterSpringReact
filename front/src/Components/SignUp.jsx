import React, { useState } from "react";
import birthDate_icon from "../assets/age.svg";
import email_icon from "../assets/email.svg";
import maleFemale_icon from "../assets/male-and-female.svg";
import user_icon from "../assets/user.svg";
import password_icon from "../assets/password.svg";

export default function SignUp() {
  // Состояние для формы
  const [formData, setFormData] = useState({
    email: "",
    gender: "",
    password: "",
    username: "",
    birthDate: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Видимость пароля
  const [passwordStrength, setPasswordStrength] = useState(""); // Сложность пароля

  // Обновление состояния при изменении полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "password") {
      updatePasswordStrength(value); // Проверка сложности пароля
    }
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

  // Функция для обновления сложности пароля
  const updatePasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Слабый");
    } else if (password.length < 10) {
      setPasswordStrength("Средний");
    } else if (/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
      setPasswordStrength("Сильный");
    } else {
      setPasswordStrength("Средний");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md relative">
      <p className="text-center mb-3  text-lg font-semibold text-white">
        Регистрация
      </p>

      <div className="text-center text-gray-400 mb-2">
        Здесь должна была быть Google Oauth,Гык
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-2">
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

        {/* Пол (Gender) */}
        <div className="mb-2">
          <label className="block text-gray-300 mb-1">Пол</label>
          <div className="flex items-center space-x-4">
            <label className="text-gray-300">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="mr-2"
              />
              Мужской
            </label>
            <label className="text-gray-300">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="mr-2"
              />
              Женский
            </label>
            <img
              src={maleFemale_icon}
              alt="maleFemale_cion"
              className="w-6 h-6 bg-slate-300 rounded-lg"
            />
          </div>
        </div>

        {/* Username */}
        <div className="mb-2">
          <div className="flex justify-between">
            <label className="block text-gray-300 mb-1" htmlFor="username">
              Имя пользователя
            </label>
            <img
              src={user_icon}
              alt="maleFemale_cion"
              className="w-6 h-6 bg-slate-300 rounded-lg"
            />{" "}
          </div>

          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white"
            required
            placeholder="username"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex justify-between">
            {" "}
            <label className="block text-gray-300 mb-1" htmlFor="password">
              Пароль
            </label>
            <img
              src={password_icon}
              alt="pas"
              className="w-6 h-6 rounded-lg bg-slate-300"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Переключаем тип между "text" и "password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white"
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
          {/* Индикатор сложности пароля */}
          <p
            className={`mt-1 text-sm ${
              passwordStrength === "Сильный"
                ? "text-green-500"
                : passwordStrength === "Средний"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            Сложность пароля: {passwordStrength}
          </p>
        </div>

        {/* Дата рождения */}
        <div className="mb-6">
          <div className="flex justify-between">
            <label className="block text-gray-300 mb-1" htmlFor="birthDate">
              Дата рождения
            </label>
            <img src={birthDate_icon} alt="birth" className="w-6 h-6 rounded-lg" />
          </div>

          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-colors"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
