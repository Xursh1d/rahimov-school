import PropTypes from "prop-types";
import { useBehaviorMarkCategoriesStore } from "../../../store/BehaviorMarkCategoriesStore";

function TableItems({ formik, index }) {
  const { getDetails } = useBehaviorMarkCategoriesStore();

  const deleteAction = async () => {
    useBehaviorMarkCategoriesStore.setState({
      deleteId: formik.values.categories?.[index]?.id,
    });
  };

  const updateAction = async () => {
    useBehaviorMarkCategoriesStore.setState({
      isOpenModal: true,
    });
    await getDetails(formik.values.categories?.[index]?.id);
  };

  return (
    <tr className="bg-white border-b border dark:bg-gray-800 dark:border-gray-700">
      <td className="border text-center px-3 py-0 xs:text-[10px] sm:text-sm  ">
        {index + 1}
      </td>
      <td
        scope="row"
        className="h-auto px-1 py-3 text-center xs:text-[10px] sm:text-sm font-medium text-gray-900  dark:text-white"
      >
        <input
          disabled
          type="text"
          name={`categories.${index}.title`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categories?.[index]?.title || ""}
          className={`px-3 py-0 h-full xs:text-[10px] sm:text-sm  font-normal ${
            formik.touched.categories?.[index]?.title &&
            formik.errors.categories?.[index]?.title &&
            "border border-red-600"
          }  outline-none text-center bg-white text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </td>
      <td className={`border`}>
        <input
          disabled
          name={`categories.${index}.status`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categories?.[index]?.status || ""}
          className={`px-3 py-0 h-full bg-inherit xs:text-[10px] sm:text-sm  ${
            formik.touched.categories?.[index]?.status &&
            formik.errors.categories?.[index]?.status &&
            "border border-red-600"
          }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </td>
      <td className="border">
        <input
          disabled
          type="text"
          name={`categories.${index}.mark`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categories?.[index]?.mark || ""}
          className={`bg-inherit px-3 py-0 h-full xs:text-[10px] sm:text-sm  ${
            formik.touched.categories?.[index]?.mark &&
            formik.errors.categories?.[index]?.mark &&
            "border border-red-600"
          }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </td>
      <td
        onClick={updateAction}
        className="border text-center px-2 text-blue-500 hover:bg-blue-50 cursor-pointer"
      >
        <div className="w-full flex items-center justify-center border-red-500">
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
        </div>
      </td>
      <td
        onClick={deleteAction}
        className="px-2 text-red-500 hover:bg-red-50 cursor-pointer"
      >
        <div className="w-full flex items-center justify-center border-red-500">
          <svg
            className="sm:w-6 sm:h-6 xs:w-4 xs:h-4 text-red-700 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
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
