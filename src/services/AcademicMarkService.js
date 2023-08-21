import axios from "axios";
import { axiosAuthInstance } from "./axiosAuthInstance";

export class AcademicMarkService {
  static async getAcademicmark(queryString = "") {
    let result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.get(
        "/marking/academic/?" + queryString
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
  static async onSubmit(data) {
    let result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.post(
        `/marking/academic/update/`,
        data
      );
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
            result = { ...result, nonFieldError: String(firstValue) };
          } else result.nonFieldError = "Saqlab bo'lmadi!";
        } else result.nonFieldError = "Saqlab bo'lmadi!";
      }
    }
    return result;
  }
}
