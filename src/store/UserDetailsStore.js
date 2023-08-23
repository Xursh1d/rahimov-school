import { create } from "zustand";
import { toastError } from "../helpers/toasts";
import { UserService } from "../services/UserService";

export const useUserStore = create((set) => ({
  loading: false,
  queryParams: {},
  setLoading: (status) => {
    set({
      loading: status,
    });
  },
  updateParams: (paramItem) => {
    set((prevState) => ({
      queryParams: { ...prevState.queryParams, ...paramItem },
    }));
  },
  onReload: async () => {
    const { data, status, nonFieldError } = await UserService.getUserDetails();
    if (status) {
      localStorage.setItem("user_details", JSON.stringify(data));
      set({
        queryParams: {
          academic_year_id: data.current_academic_year,
          branch_id: data.current_branch,
        },
      });
    } else toastError(nonFieldError);
  },
  updateState: async (state) => {
    const { status, nonFieldError } = await UserService.updateUserState(state);
    if (status) {
      //   toastSuccess(nonFieldError);
    } else toastError(nonFieldError);
  },
}));
