import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Mine() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newComments, setNewComments] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Состояние загрузки для запросов

  const token = localStorage.getItem("jwtToken");

  const getPosts = async () => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        if (Array.isArray(parsedPosts)) {
          setPosts(parsedPosts);
        } else {
          setError("Неверный формат данных в localStorage.");
        }
      } catch (error) {
        setError("Ошибка при парсинге данных.");
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleCreatePost = () => {
    if (!token) {
      setError("Токен не найден. Пожалуйста, войдите.");
      return;
    }

    if (newPostContent.trim()) {
      setLoading(true); // Начать загрузку
      axios
        .post(
          "http://localhost:8080/api/v1/createPost",
          { content: newPostContent },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          const updatedPosts = [...posts, response.data];
          setPosts(updatedPosts);
          localStorage.setItem("posts", JSON.stringify(updatedPosts));
          setNewPostContent("");
          togglePopup();
        })
        .catch((err) => {
          console.error(err);
          setError("Ошибка при создании поста");
        })
        .finally(() => setLoading(false)); // Остановить загрузку
    } else {
      setError("Содержание поста не может быть пустым");
    }
  };

  const handleDeletePost = (postId) => {
    if (!token) {
      setError("Токен не найден. Пожалуйста, войдите.");
      return;
    }

    setLoading(true);
    axios
      .delete(`http://localhost:8080/api/v1/deletePost/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
      })
      .catch((err) => {
        console.error(err);
        setError("Ошибка при удалении поста");
      })
      .finally(() => setLoading(false));
  };

  const handleLikePost = (postId) => {
    if (!token) {
      setError("Токен не найден. Пожалуйста, войдите.");
      return;
    }

    setLoading(true);
    axios
      .post(
        `http://localhost:8080/api/v1/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: response.data.likes || post.likes, // Обновляем количество лайков
                dislikes: post.dislikes, // Оставляем дизлайки прежними
              }
            : post
        );
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
      })
      .catch((err) => {
        console.error(err);
        setError("Ошибка при лайке поста");
      })
      .finally(() => setLoading(false));
  };

  const handleDislikePost = (postId) => {
    if (!token) {
      setError("Токен не найден. Пожалуйста, войдите.");
      return;
    }

    setLoading(true);
    axios
      .post(
        `http://localhost:8080/api/v1/${postId}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                dislikes: response.data.dislikes || post.dislikes, // Обновляем количество дизлайков
                likes: post.likes, // Оставляем лайки прежними
              }
            : post
        );
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
      })
      .catch((err) => {
        console.error(err);
        setError("Ошибка при дизлайке поста");
      })
      .finally(() => setLoading(false));
  };

  const handleAddComment = (postId) => {
    if (!token) {
      setError("Токен не найден. Пожалуйста, войдите.");
      return;
    }

    const commentContent = newComments[postId];

    if (commentContent && commentContent.trim()) {
      setLoading(true);
      axios
        .post(
          `http://localhost:8080/api/v1/${postId}/comment`,
          { content: commentContent },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          const updatedPosts = posts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...(post.comments || []), response.data] }
              : post
          );
          setPosts(updatedPosts);
          localStorage.setItem("posts", JSON.stringify(updatedPosts));
          setNewComments({ ...newComments, [postId]: "" });
        })
        .catch((err) => {
          console.error(err);
          setError("Ошибка при добавлении комментария");
        })
        .finally(() => setLoading(false));
    } else {
      setError("Комментарий не может быть пустым");
    }
  };

  return (
    <div className="container mx-auto p-6 text-center mt-4">
      <h2 className="text-2xl font-bold mb-4">Мои посты</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-blue-500">Загрузка...</p>}
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
      >
        Добавить пост
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Создать новый пост</h3>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Введите содержание поста"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCreatePost}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Создать
              </button>
              <button
                onClick={togglePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-black">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg mb-6 p-4">
            <p className="text-lg">{post.content}</p>

            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleLikePost(post.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Лайк {post.likes || 0}
              </button>
              <button
                onClick={() => handleDislikePost(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Дизлайк {post.dislikes || 0}
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Комментарии:</h4>
              {post.comments && Array.isArray(post.comments) && post.comments.length ? (
                <ul className="space-y-2">
                  {post.comments.map((comment) => (
                    <li key={comment.id} className="bg-gray-100 p-2 rounded-lg">
                      {comment.content}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Нет комментариев</p>
              )}
            </div>

            <div className="mt-4">
              <textarea
                value={newComments[post.id] || ""}
                onChange={(e) =>
                  setNewComments({ ...newComments, [post.id]: e.target.value })
                }
                placeholder="Добавьте комментарий"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Добавить комментарий
              </button>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDeletePost(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Удалить пост
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
