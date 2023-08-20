import { create } from "zustand";
import { toastError, toastSuccess } from "../helpers/toasts";
import { AttendaceService } from "../services/AttendanceService";

export const useAttendaceStore = create((set) => ({
  loading: false,
  students: null,
  attendance_dates: null,
  toggleDateModal: false,
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
      await AttendaceService.getAttendance();
    if (status) {
      set({
        students: data.students,
        attendance_dates: data.attendance_dates,
        filterset: data.filterset,
        queryParams: {},
      });
    } else toastError(nonFieldError);
  },
  loadItems: async (queryString = "") => {
    const { data, status, nonFieldError } =
      await AttendaceService.getAttendance(queryString);
    if (status) {
      set({
        students: data.students,
        attendance_dates: data.attendance_dates,
        filterset: data.filterset,
      });
    } else toastError(nonFieldError);
  },
  onSubmit: async (data) => {
    const { status, nonFieldError } = await AttendaceService.onSubmit(data);
    if (status) {
      toastSuccess(nonFieldError);
    } else toastError(nonFieldError);
  },
}));
