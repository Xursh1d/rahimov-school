import PropTypes from "prop-types";

function TableItems({ formik, item, index }) {
  return (
    <tr className="bg-white border-b border dark:bg-gray-800 dark:border-gray-700">
      <td className="border px-3 py-3 xs:text-[10px] sm:text-sm  ">
        {index + 1}
      </td>
      <th
        scope="row"
        className="px-1 py-0 text-center xs:text-[10px] sm:text-sm font-medium text-gray-900  dark:text-white"
      >
        {item.student}
      </th>
      <td className={`border`}>
        <input
          name={`students.${index}.first_term_points`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.students?.[index]?.first_term_points || 0}
          type="number"
          className={`px-3 py-0 h-full xs:text-[10px] sm:text-sm  ${
            formik.touched.students?.[index]?.first_term_points &&
            formik.errors.students?.[index]?.first_term_points &&
            "border border-red-600"
          }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </td>
      <td className="border">
        <input
          type="number"
          name={`students.${index}.second_term_points`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.students?.[index]?.second_term_points || ""}
          className={`px-3 py-0 h-full xs:text-[10px] sm:text-sm  ${
            formik.touched.students?.[index]?.second_term_points &&
            formik.errors.students?.[index]?.second_term_points &&
            "border border-red-600"
          }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </td>

      <td className="border">
        <input
          value={item.average_term_points}
          type="number"
          disabled
          className="px-3 py-3 bg-lime-50 h-full xs:text-[10px] sm:text-sm outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </td>

      <td className="border">
        <input
          type="number"
          defaultValue={item.average_term_mark}
          disabled
          className="px-3 py-3 bg-lime-50 h-full xs:text-[10px] sm:text-sm    outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </td>

      <td className="border">
        <input
          type="number"
          min={0}
          name={`students.${index}.final_term_points`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.students?.[index]?.final_term_points || ""}
          className={`px-3 py-0 h-full xs:text-[10px] sm:text-sm  ${
            formik.touched.students?.[index]?.final_term_points &&
            formik.errors.students?.[index]?.final_term_points &&
            "border border-red-600"
          }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </td>
      <td className="border">
        <input
          type="number"
          defaultValue={item.final_mark}
          disabled
          className="px-3 py-3 bg-lime-50 h-full xs:text-[10px] sm:text-sm    outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </td>
    </tr>
  );
}

TableItems.propTypes = {
  formik: PropTypes.any,
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default TableItems;
