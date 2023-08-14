import { create } from "zustand";

export const useLoginStore = create((set) => ({
  isLoading: false,
  isOpenSideBar: false,
  toggleAttendanceDrop: false,
  toggleMarkDrop: false,
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
}));
