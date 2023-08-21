import { create } from "zustand";
import { toastError, toastSuccess } from "../helpers/toasts";
import { AttendaceService } from "../services/AttendanceService";

export const useAttendaceStore = create((set) => ({
  loading: false,
  students: null,
  attendance_dates: null,
  toggleDateModal: false,
  deletedDate: null,
  filterset: null,
  queryParams: {},
  setLoader: (status) => {
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
  attendanceUpdate: async (data) => {
    const { status, nonFieldError } = await AttendaceService.updateAttendance(
      data
    );
    if (status) {
      toastSuccess(nonFieldError);
    } else toastError(nonFieldError);
  },
  deleteDateAction: async (date) => {
    const { status, nonFieldError } = await AttendaceService.deleteDate(date);
    if (status) {
      set({
        deletedDate: null,
      });
      toastSuccess(nonFieldError);
    } else toastError(nonFieldError);
  },
}));
