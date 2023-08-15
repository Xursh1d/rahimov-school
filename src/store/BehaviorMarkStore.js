import { create } from "zustand";
import { toastError } from "../helpers/toasts";
import { BehaviorMarkService } from "../services/BehaviorMarkService";

export const useBehaviorMarkStore = create((set) => ({
  loading: false,
  students: null,
  studentId: null,
  filterset: null,
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
    const { data, status, nonFieldError } =
      await BehaviorMarkService.getBehaviorMark();
    if (status) {
      set({
        students: data.behavior_marks,
        filterset: data.filterset,
        queryParams: {},
      });
    } else toastError(nonFieldError);
  },
  loadItems: async (queryString = "") => {
    const { data, status, nonFieldError } =
      await BehaviorMarkService.getBehaviorMark(queryString);
    if (status) {
      set({
        students: data.behavior_marks,
      });
    } else toastError(nonFieldError);
  },
}));
