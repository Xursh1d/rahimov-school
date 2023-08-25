import { create } from "zustand";
import { toastError, toastSuccess } from "../helpers/toasts";
import { AcademicMarkService } from "../services/AcademicMarkService";

export const useAcademicMarkStore = create((set) => ({
  loading: false,
  openPopup: false,
  students: null,
  filterset: null,
  academic_changed: false,
  queryParams: {},
  setLoading: (status) => {
    set({
      loading: status,
    });
  },
  setChanged: (status) => {
    set({
      academic_changed: status,
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
        queryParams: {},
      });
    } else toastError(nonFieldError);
  },
  loadItems: async (queryString = "") => {
    const { data, status, nonFieldError } =
      await AcademicMarkService.getAcademicmark(queryString);
    if (status) {
      set({
        students: data.academic_marks,
        filterset: data.filterset,
      });
    } else toastError(nonFieldError);
  },
  onSubmit: async (data) => {
    const { status, nonFieldError } = await AcademicMarkService.onSubmit(data);
    if (status) {
      toastSuccess(nonFieldError);
    } else toastError(nonFieldError);
  },
}));
