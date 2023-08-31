import axios from "axios";
import { axiosAuthInstance } from "./axiosAuthInstance";


export class HolidayService {
  static async getHolidays(queryString = "") {
    let result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.get(
        "/holidays/?" + queryString
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
  static async getDetails(id) {
    let result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.get(
        `/holidays/${id}/`
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
  static async addHoliday(data) {
    var result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.post(
        `/holidays/`,
        data
      );

      if (response.status === 201) {
        result = {
          ...result,
          status: true,
          data: response.data,
          nonFieldError: "Saqlandi",
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
          } else result.nonFieldError = "Saqlab bo'lmadi!";
        } else result.nonFieldError = "Saqlab bo'lmadi!";
      }
    }
    return result;
  }

  static async deleteHoliday(id) {
    var result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.delete(
        `/holidays/${id}/`
      );

      if (response.status === 204) {
        result = {
          ...result,
          status: true,
          data: response.data,
          nonFieldError: "O'chirildi",
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
          } else result.nonFieldError = "O'chirib bo'lmadi!";
        } else result.nonFieldError = "O'chirib bo'lmadi!";
      }
    }
    return result;
  }

  static async updateHoliday(id, data) {
    var result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.patch(
        `/holidays/${id}/`,
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
            result = { ...result, nonFieldError: firstValue[0] };
          } else result.nonFieldError = "Yangilab bo'lmadi!";
        } else result.nonFieldError = "Yangilab bo'lmadi!";
      }
    }
    return result;
  }
}
