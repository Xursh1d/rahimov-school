import { useState } from "react";
import PropTypes from "prop-types";
import { useBehaviorMarkStore } from "../../../store/BehaviorMarkStore";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  category_id: "",
  content: "",
};

function CommentModal({ studentId, cancelCallback }) {
  const [loading, setLoader] = useState(false);
  const { loadItems, filterset, change, queryParams, onSubmit, setLoading } =
    useBehaviorMarkStore();

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: false,
    validationSchema: Yup.object({
      content: Yup.string(),
      category_id: Yup.string()
        .min(1, "Kategoriya tanlang!")
        .required("Kategoriya tanlang!"),
    }),
    onSubmit: async (values) => {
      setLoader(true);
      await onSubmit({ ...values, behavior_mark_id: studentId });
      closeModal();
      setLoading(true);
      await loadItems(
        new URLSearchParams({
          ...queryParams,
        }).toString()
      );
      setLoading(false);
    },
  });

  const closeModal = () => {
    if (change) {
      console.log("ishla");
      useBehaviorMarkStore.setState({
        openPopup: true,
      });
    } else cancelCallback();

    setLoader(false);
    formik.resetForm();
  };

  return (
    <div
      onClick={() => closeModal()}
      id="defaultModal"
      aria-hidden="true"
      className={`fixed flex items-center justify-center transition-all top-0 left-0 bottom-0 right-0 z-50 ${
        !studentId ? "hidden" : "bg-[#66656547] dark:#3a3839ad"
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
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 18"
              fill="currentColor"
            >
              <path
                d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                fill="currentColor"
              />
              <path
                d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                fill="currentColor"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              O`quvchi haqida
            </h3>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6 flex items-start flex-col relative w-full">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Axloqiy Kategoriya
                </label>
                <select
                  onChange={formik.handleChange}
                  name="category_id"
                  onBlur={formik.handleBlur}
                  value={formik.values.category_id}
                  id="countries"
                  className={`${
                    formik.errors.category_id && "border-red-500"
                  } bg-white outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500`}
                >
                  <option selected></option>
                  {filterset?.comment_categories.map((categoriya) => {
                    return (
                      <option key={categoriya.id} value={categoriya.id}>
                        {categoriya.title}
                      </option>
                    );
                  })}
                </select>
                {formik.errors.category_id && (
                  <span className="absolute top-[70px] transition-all duration-300  text-red-500  text-sm">
                    {formik.errors.category_id}
                  </span>
                )}
              </div>
              <div className="mb-6 flex items-start flex-col">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Izoh
                </label>
                <textarea
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  className=" border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                />
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
  studentId: PropTypes.string,
  cancelCallback: PropTypes.func.isRequired,
};
export default CommentModal;
