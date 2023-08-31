import { create } from "zustand";
import { toastError, toastSuccess } from "../helpers/toasts";
import { HolidayService } from "../services/HolidayService";

export const useHolidayStore = create((set) => ({
    loading: false,
    holidays: null,
    monthId: null,
    cancelCallbackComment: null,
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
            await HolidayService.getHolidays();
        if (status) {
            set({
                holidays: data.holidays,
                filterset: data.filterset,
                queryParams: {},
            });
        } else toastError(nonFieldError);
    },
    loadItems: async (queryString = "") => {
        const { data, status, nonFieldError } =
            await HolidayService.getHolidays(queryString);
        if (status) {
            set({
                holidays: data.holidays,
                filterset: data.filterset,
            });
        } else toastError(nonFieldError);
    },
    onSubmit: async (holidayData) => {
        const { status, nonFieldError } = await HolidayService.addHoliday(
            holidayData
        );
        if (status) {
            toastSuccess(nonFieldError);
        } else toastError(nonFieldError);
    },
}));
