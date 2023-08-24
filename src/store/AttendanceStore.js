import { create } from "zustand";
import { toastError, toastSuccess } from "../helpers/toasts";
import { AttendaceService } from "../services/AttendanceService";
import { createQueryString } from "../helpers/createQueryString"

export const useAttendaceStore = create((set) => ({
  loading: false,
  changed: false,
  openPopup: null,
  students: null,
  attendance_dates: null,
  toggleDateModal: false,
  deletedDate: null,
  filterset: null,
  queryParams: {},

  attendanceFilters: JSON.parse(localStorage.getItem("attendanceFilters")) || {
    teacher_id: null,
    subject_id: null,
    class_id: null,
    month_id: null,
  },

  setAttendanceFilters: (filters) => {
    set((state) => {
      const newFilters = { ...state.attendanceFilters, ...filters };
      localStorage.setItem("attendanceFilters", JSON.stringify(newFilters));
      return { attendanceFilters: newFilters };
    });
  },

  resetAttendanceFilters: (param = null) => {
    const resetFilters = {
      teacher_id: null,
      subject_id: null,
      class_id: null,
      month_id: null,
    };

    if (param === "teacher_id") {
      resetFilters.teacher_id = this.attendanceFilters.teacher_id;
    } else if (param === "subject_id") {
      resetFilters.teacher_id = this.attendanceFilters.teacher_id;
      resetFilters.subject_id = this.attendanceFilters.subject_id;
    } else if (param === "class_id") {
      resetFilters.teacher_id = this.attendanceFilters.teacher_id;
      resetFilters.subject_id = this.attendanceFilters.subject_id;
      resetFilters.class_id = this.attendanceFilters.class_id;
    }

    set({
      attendanceFilters: resetFilters,
    });

    localStorage.setItem("attendanceFilters", JSON.stringify(resetFilters));
  },

  setLoader: (status) => {
    set({
      loading: status,
    });
  },
  setChanged: (status) => {
    set({
      changed: status,
    });
  },
  updateParams: (paramItem) => {
    set((prevState) => ({
      queryParams: { ...prevState.queryParams, ...paramItem },
    }));
  },
  onReload: async () => {
    const querySet = createQueryString(JSON.parse(localStorage.getItem("attendanceFilters")))
    const { data, status, nonFieldError } =
      await AttendaceService.getAttendance(querySet);
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
    } else {
      toastError(nonFieldError);
    }
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
