import PropTypes from "prop-types";
import { useState } from "react";
import { toastError, toastSuccess } from "../../../../helpers/toasts";
import { BehaviorMarkService } from "../../../../services/BehaviorMarkService";
import { useBehaviorMarkStore } from "../../../../store/BehaviorMarkStore";

function TableItems({ formik, index }) {
  const [loading, setLoader] = useState(false);
  const [updateLoading, setUpdateLoader] = useState(false);
  const { loadItems, filterset, queryParams, setLoading } =
    useBehaviorMarkStore();

  const deleteAction = async () => {
    setLoader(true);
    const { status, nonFieldError } = await BehaviorMarkService.deleteComment(
      formik.values.studentComment?.[index]?.id
    );
    if (status) {
      toastSuccess(nonFieldError);
      setLoading(true);
      await loadItems(
        new URLSearchParams({
          ...queryParams,
        }).toString()
      );
      setLoading(false);
    } else toastError(nonFieldError);
    setLoader(false);
  };

  const updateAction = async () => {
    setUpdateLoader(true);
    const { status, nonFieldError } = await BehaviorMarkService.updateComment(
      formik.values.studentComment?.[index]?.id,
      formik.values.studentComment[index]
    );
    if (status) {
      toastSuccess(nonFieldError);
      setLoading(true);
      await loadItems(
        new URLSearchParams({
          ...queryParams,
        }).toString()
      );
      setLoading(false);
    } else toastError(nonFieldError);
    setUpdateLoader(false);
  };

  return (
    <tr className="bg-white border-b border dark:bg-gray-800 dark:border-gray-700">
      <td className="border px-3 py-0 xs:text-[10px] sm:text-sm  ">
        {index + 1}
      </td>
      <th
        scope="row"
        className="h-auto px-1 py-0 text-center xs:text-[10px] sm:text-sm font-medium text-gray-900  dark:text-white"
      >
        <textarea
          name={`studentComment.${index}.content`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.studentComment?.[index]?.content || ""}
          className={`px-3 py-0 h-full xs:text-[10px] sm:text-sm  font-normal ${formik.touched.studentComment?.[index]?.content &&
            formik.errors.studentComment?.[index]?.content &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </th>
      <td className={`border`}>
        <select
          name={`studentComment.${index}.category_id`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.studentComment?.[index]?.category_id || ""}
          className={`px-3 py-0 h-full bg-inherit xs:text-[10px] sm:text-sm  ${formik.touched.studentComment?.[index]?.category_id &&
            formik.errors.studentComment?.[index]?.category_id &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
          <option selected></option>
          {filterset?.comment_categories.map((categoriya) => {
            return (
              <option
                key={categoriya.id}
                value={categoriya.id}
                className="border-red-500 text-start"
              >
                {categoriya.title}
              </option>
            );
          })}
        </select>
      </td>
      <td className="border">
        <input
          type="text"
          name={`studentComment.${index}.marked_teacher`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.studentComment?.[index]?.marked_teacher || ""}
          disabled
          className={`bg-inherit px-3 py-0 h-full xs:text-[10px] sm:text-sm  ${formik.touched.studentComment?.[index]?.marked_teacher &&
            formik.errors.studentComment?.[index]?.marked_teacher &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </td>
      <td className="border">
        <input
          type="text"
          name={`studentComment.${index}.marked_time`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.studentComment?.[index]?.marked_time || ""}
          disabled
          className={`bg-inherit px-3 py-0 h-full xs:text-[10px] sm:text-sm  ${formik.touched.studentComment?.[index]?.marked_time &&
            formik.errors.studentComment?.[index]?.marked_time &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </td>
      <td
        onClick={updateAction}
        className="border w-[50px] text-center p-2 text-blue-500 hover:bg-blue-50 cursor-pointer"
      >
        <div className="w-full flex items-center justify-center border-red-500">
          {updateLoading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
          ) : (
            <svg
              className="sm:w-6 sm:h-6 xs:w-4 xs:h-4 m-0 text-blue-700 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
              <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
            </svg>
          )}
        </div>
      </td>
      <td
        onClick={deleteAction}
        className="border w-[50px] text-center p-2 text-red-500 hover:bg-red-50 cursor-pointer"
      >
        <div className="w-full flex items-center justify-center border-red-500">
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
          ) : (
            <svg
              className="sm:w-6 sm:h-6 xs:w-4 xs:h-4 text-red-700 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
          )}
        </div>
      </td>
    </tr>
  );
}

TableItems.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number.isRequired,
};

export default TableItems;
