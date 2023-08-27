import { create } from "zustand";
import { toastError, toastSuccess } from "../helpers/toasts";
import { BehaviorMarkCategoriesService } from "../services/BehaviouralMarkCategoriesService";

export const useBehaviorMarkCategoriesStore = create((set) => ({
  loading: false,
  categories: null,
  isOpenModal: false,
  status_options: null,
  deleteId: null,
  category_details: null,
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
      await BehaviorMarkCategoriesService.getCategories();
    console.log(data);
    if (status) {
      set({
        categories: data.comment_categories,
        status_options: data.status_options,
        queryParams: {},
      });
    } else toastError(nonFieldError);
  },
  loadItems: async (queryString = "") => {
    const { data, status, nonFieldError } =
      await BehaviorMarkCategoriesService.getCategories(queryString);
    if (status) {
      set({
        categories: data.comment_categories,
      });
    } else toastError(nonFieldError);
  },
  onSubmit: async (commentData) => {
    const { status, nonFieldError } =
      await BehaviorMarkCategoriesService.applyComment(commentData);
    if (status) {
      toastSuccess(nonFieldError);
    } else toastError(nonFieldError);
  },
  getDetails: async (id) => {
    const { data, status, nonFieldError } =
      await BehaviorMarkCategoriesService.getDetails(id);
    if (status) {
      set({
        category_details: data,
      });
      toastSuccess(nonFieldError);
    } else toastError(nonFieldError);
  },
}));
