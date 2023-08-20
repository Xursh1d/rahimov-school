import axios from "axios";
import { axiosAuthInstance } from "./axiosAuthInstance";

export class BehaviorMarkService {
  static async getBehaviorMark(queryString = "") {
    let result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.get(
        "/marking/behavior/?" + queryString
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
        console.log(errorResponse);
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
  static async applyComment(data) {
    var result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.post(
        `/marking/behavior/comment/`,
        data
      );
      console.log(response);

      if (response.status === 201) {
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
          console.log(firstKey);
          if (firstKey && firstValue) {
            result = { ...result, nonFieldError: firstValue[0] };
          } else result.nonFieldError = "Saqlab bo'lmadi!";
        } else result.nonFieldError = "Saqlab bo'lmadi!";
      }
    }
    return result;
  }

  static async deleteCommit(id) {
    var result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.post(
        `/marking/behavior/comment/${id}/delete/`
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
          } else result.nonFieldError = "O'chirib bo'lmadi!";
        } else result.nonFieldError = "O'chirib bo'lmadi!";
      }
    }
    return result;
  }

  static async updateCommit(id, data) {
    var result = {
      status: false,
      data: null,
      nonFieldError: null,
    };
    try {
      const response = await axiosAuthInstance.post(
        `/marking/behavior/comment/${id}/update/`,
        data
      );
      console.log(response);

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
          console.log(firstKey);
          if (firstKey && firstValue) {
            result = { ...result, nonFieldError: firstValue[0] };
          } else result.nonFieldError = "Yangilab bo'lmadi!";
        } else result.nonFieldError = "Yangilab bo'lmadi!";
      }
    }
    return result;
  }
}
