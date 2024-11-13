import axios from "axios";
import React, { useState, useEffect } from "react";

export default function UserInfo() {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthDate: "",
    gender: "",
  });

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) {
      // Перенаправляем на страницу входа, если токен отсутствует
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:8080/secured/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setFormData({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          birthDate: response.data.birthDate,
          gender: response.data.gender,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
        } else {
          console.error("Ошибка:", error.response);
        }
      });
  }, [token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    // Сбрасываем форму на исходные данные при отмене редактирования
    setFormData({
      id: data.id, // сохраняем id
      username: data.username,
      email: data.email,
      birthDate: data.birthDate,
      gender: data.gender,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id) {
      console.error("ID пользователя отсутствует!");
      return;
    }

    axios
      .patch("http://localhost:8080/secured/editUser", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении данных", error);
      });
  };

  return (
    <div className="pt-10">
      <div
        className="flex flex-col justify-center items-center"
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2 className="mb-8">Информация о пользователе</h2>
        {data ? (
          <div className="flex flex-col gap-1">
            <p className="mb-2">
              <strong>Имя пользователя:</strong> {data.username}
            </p>
            <p className="mb-2">
              <strong>Электронная почта:</strong> {data.email}
            </p>
            <p>
              <strong>Дата рождения:</strong>{" "}
              {new Date(data.birthDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Пол:</strong> {data.gender}
            </p>
            <button
              onClick={handleEditClick}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Редактировать
            </button>
          </div>
        ) : (
          <p>Загрузка данных...</p>
        )}
      </div>

      {/* Модальное окно для редактирования данных пользователя */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10">
          <div className="bg-indigo-900 p-6 rounded-lg shadow-md w-96 border-solid border-4">
            <h3 className="mb-4 text-xl text-white">
              Редактировать информацию о пользователе
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white">Имя пользователя</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Электронная почта</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Дата рождения</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Пол</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                  <option value="other">Другой</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
