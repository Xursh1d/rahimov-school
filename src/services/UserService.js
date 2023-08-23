import axios from "axios";
import { axiosAuthInstance } from "./axiosAuthInstance";

export class UserService {
  static async getUserDetails(queryString = "") {
    let result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.get(
        "/auth/get_me/?" + queryString
      );
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
            result = { ...result, nonFieldError: firstValue };
          } else result.nonFieldError = "Ma'lumot olib bo'lmadi!";
        }
      }
    }
    return result;
  }

  static async updateUserState(data) {
    var result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.post(`/auth/user_state/`, data);

      if (response.status === 200) {
        result = {
          ...result,
          status: true,
          data: response.data,
          nonFieldError: response.data.detail,
        };
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorResponse = e.response;
        if (errorResponse) {
          const errorMessage = errorResponse.data;
          const [firstKey, firstValue] = Object.entries(errorMessage)[0];
          if (firstKey && firstValue) {
            result = { ...result, nonFieldError: firstValue[0] };
          } else result.nonFieldError = "Yangilab bo'lmadi!";
        } else result.nonFieldError = "Yangilab bo'lmadi!";
      }
    }
    return result;
  }
}
