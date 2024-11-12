import axios, { AxiosError } from "axios";
interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
}
const baseApi = axios.create({
  baseURL: "https://r6nt2plp-4500.asse.devtunnels.ms/api/",
});
baseApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      // Если сервер вернул сообщение об ошибке, обрабатываем его
      const apiError = {
        message: error.response.data?.message || ['Unknown error'],
        error: error.response.data?.error || 'Bad Request',
        statusCode: error.response.status || 400,
      };
      return Promise.reject(apiError);
    }

    // Если ответа от сервера нет, возвращаем общую сетевую ошибку
    return Promise.reject({
      message: ['Network Error'],
      error: 'Network Error',
      statusCode: 500,
    });
  }
);
export {baseApi}

