import { create } from "zustand";
import { toastError } from "../helpers/toasts";
import { AcademicMarkService } from "../services/AcademicMarkService";

export const useAcademicMarkStore = create((set) => ({
  isLoading: false,
  students: null,
  filterset: null,
  queryParams: {
    page: 1,
  },
  setLoading: (status) => {
    set({
      isLoading: status,
    });
  },
  updateParams: (paramItem) => {
    set((prevState) => ({
      queryParams: { ...prevState.queryParams, ...paramItem },
    }));
  },
  onReload: async () => {
    const { data, status, nonFieldError } =
      await AcademicMarkService.getAcademicmark();
    if (status) {
      set({
        students: data.academic_marks,
        filterset: data.filterset,
      });
    } else toastError(nonFieldError);
  },
  loadItems: async (queryString = "") => {
    const { data, status, nonFieldError } =
      await AcademicMarkService.getAcademicmark(queryString);
    if (status) {
      set({
        students: data.academic_marks,
      });
    } else toastError(nonFieldError);
  },
}));
