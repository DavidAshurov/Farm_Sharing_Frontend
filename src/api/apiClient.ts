import axios from "axios";
// This file sets up an Axios instance for making API requests
// It uses the base URL from environment variables or defaults to localhost
 // Устанавливаем приоритет загрузки изображения (создаем настроенный клиент Axios)


// This instance can be used throughout the application to make API calls
//   создаем базовый (настроенный) клиент Axios
const api = axios.create({
    // Используем базовый URL из переменных окружения или localhost по умолчанию
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  }, timeout : 5000, // Устанавливаем тайм-аут в 5 секунд макс. на запрос
});

// Добавляем интерсептор для добавления токена авторизации в заголовки запросов
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
// Используем spread оператор для добавления токена в заголовки
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

    }
    return config;

});
export default api;

//   создаем базовый (настроенный) клиент Axios
// const api = axios.create({
//     // Используем базовый URL из переменных окружения или localhost по умолчанию
//     baseURL:  "http://api.farm-sharing.com",
//     timeout : 5000, // Устанавливаем тайм-аут в 5 секунд макс. на запрос
//     headers: {
//         "Content-Type": "application/json",
//     }
// });
// Теперь этот api можно импортировать в других модулях для выполнения запросов