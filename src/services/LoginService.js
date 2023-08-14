import axiosInstance from "./axiosInstance";
import axios from "axios";

export default class LoginService {
  static async login(data) {
    let result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosInstance.post("auth/login/", data);
      if (response.status === 200) {
        result = {
          ...result,
          status: true,
          data: response.data,
        };
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorResponse = e.response;
        if (errorResponse) {
          const errorMessage = errorResponse.data;
          const [firstKey, firstValue] = Object.entries(errorMessage)[0];
          if (firstKey && firstValue) {
            result = { ...result, nonFieldError: String(firstValue) };
          } else result.nonFieldError = "Login yoki parol xato!";
        }
      }
    }
    return result;
  }
}
