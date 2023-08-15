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
}
