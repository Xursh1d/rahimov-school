import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useBehaviorMarkCategoriesStore } from "../../../store/BehaviorMarkCategoriesStore";
import { toastError, toastSuccess } from "../../../helpers/toasts";
import { BehaviorMarkCategoriesService } from "../../../services/BehaviouralMarkCategoriesService";

const initialValues = {
  status: "",
  title: "",
  mark: "",
};

function CommentModal({ categoryId, cancelCallback }) {
  const [loading, setLoader] = useState(false);
  const {
    loadItems,
    status_options,
    category_details,
    queryParams,
    onSubmit,
    setLoading,
  } = useBehaviorMarkCategoriesStore();

  useEffect(() => {
    for (const [key, value] of Object.entries(category_details || {})) {
      formik.setFieldValue(key, value, false);
    }
  }, [category_details]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: false,
    validationSchema: Yup.object({
      title: Yup.string().required("Kategoriya nomini kiriting"),
      mark: Yup.string().required("Ushbu maydonni to'ldiring"),
      status: Yup.string()
        .min(1, "Statusni tanlang!")
        .required("Statusni tanlang!"),
    }),
    onSubmit: async (values) => {
      setLoader(true);
      if (category_details) {
        await update(values);
      } else await save(values);
    },
  });

  const save = async (values) => {
    await onSubmit(values);
    closeModal();
    setLoading(true);
    await loadItems(
      new URLSearchParams({
        ...queryParams,
      }).toString()
    );
    setLoading(false);
  };

  const update = async (values) => {
    const { status, nonFieldError } =
      await BehaviorMarkCategoriesService.updateCommit(
        category_details.id,
        values
      );
    if (status) {
      toastSuccess(nonFieldError);
      closeModal();
      setLoading(true);
      await loadItems(
        new URLSearchParams({
          ...queryParams,
        }).toString()
      );
      setLoading(false);
    } else toastError(nonFieldError);
  };

  const closeModal = () => {
    cancelCallback();
    setLoader(false);
    formik.resetForm();
  };

  return (
    <div
      onClick={() => closeModal()}
      id="defaultModal"
      aria-hidden="true"
      className={`fixed flex items-center justify-center transition-all top-0 left-0 bottom-0 right-0 z-50 ${!categoryId ? "hidden" : "bg-[#66656547] dark:#3a3839ad"
        }  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-full"
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => closeModal()}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Kategoriya qo`shish
            </h3>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6 relative flex items-start flex-col">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nomi
                </label>
                <input
                  name="title"
                  type={"text"}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className={`${formik.errors.title && "border-red-500"
                    } bg-white outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500`}
                />
                {formik.errors.title && (
                  <span className="absolute top-[70px] transition-all duration-300  text-red-500  text-sm">
                    {formik.errors.title}
                  </span>
                )}
              </div>
              <div className="mb-6 flex items-start flex-col relative w-full">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Status turlari
                </label>
                <select
                  onChange={formik.handleChange}
                  name="status"
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                  id="countries"
                  className={`${formik.errors.status && "border-red-500"
                    } bg-white outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500`}
                >
                  <option selected></option>
                  {status_options?.map((categoriya) => {
                    return (
                      <option
                        key={categoriya.status_id}
                        value={categoriya.status_id}
                      >
                        {categoriya.title}
                      </option>
                    );
                  })}
                </select>
                {formik.errors.status && (
                  <span className="absolute top-[70px] transition-all duration-300  text-red-500  text-sm">
                    {formik.errors.status}
                  </span>
                )}
              </div>

              <div className="mb-6 relative flex items-start flex-col">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kategoriya balli
                </label>
                <input
                  name="mark"
                  type={"number"}
                  value={formik.values.mark}
                  onChange={formik.handleChange}
                  min={0}
                  className={`${formik.errors.mark && "border-red-500"
                    } bg-white outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500`}
                />
                {formik.errors.mark && (
                  <span className="absolute top-[70px] transition-all duration-300  text-red-500  text-sm">
                    {formik.errors.mark}
                  </span>
                )}
              </div>

              <div className="flex items-center w-full justify-center gap-4">
                <button
                  onClick={() => closeModal()}
                  data-modal-hide="popup-modal"
                  type="button"
                  className=" text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Yo`q, ortga
                </button>
                {!loading ? (
                  <button
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Saqlash
                  </button>
                ) : (
                  <button
                    disabled
                    type="button"
                    className="px-5 py-2.5  text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-green-700 focus:text-green-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
CommentModal.propTypes = {
  categoryId: PropTypes.bool,
  cancelCallback: PropTypes.func.isRequired,
};
export default CommentModal;
