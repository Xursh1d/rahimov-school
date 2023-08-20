import PropTypes from "prop-types";
import { useAttendaceStore } from "../../../store/AttendanceStore";

function TableItems({ formik, item, index }) {
  const { attendance_dates, filterset } = useAttendaceStore();

  return (
    <tr className="bg-white border-b border dark:bg-gray-800 dark:border-gray-700">
      <td className="border px-3">{index + 1}</td>
      <th
        scope="row"
        className="sm:px-2 xs:min-w-[150px] sm:min-w-[200px] xs:px-1 xs:text-[10px] sm:text-sm text-center font-medium text-gray-900  dark:text-white"
      >
        {item.student}
      </th>
      {attendance_dates?.map((item) => {
        return (
          <td key={item.date} className="border">
            <select
              name={`students.${index}.category_id`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.students?.[index]?.category_id || ""}
              className={`sm:p-2.5 xs:p-1 h-full bg-inherit xs:text-[10px] sm:text-sm  ${
                formik.touched.students?.[index]?.category_id &&
                formik.errors.students?.[index]?.category_id &&
                "border border-red-600"
              }   min-w-[50px] xs:text-[10px] sm:text-sm  outline-none text-center  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >
              <option selected></option>
              {filterset?.attendance_options.map((item) => {
                return (
                  <option
                    key={item.key}
                    value={item.key}
                    className="border-red-500 text-start"
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </td>
        );
      })}

      <td className="border sm:px-2 w-[50px] xs:px-1  sm:text-sm  outline-none text-center p-2.5"></td>
    </tr>
  );
}

TableItems.propTypes = {
  item: PropTypes.object.isRequired,
  formik: PropTypes.any,
  index: PropTypes.number.isRequired,
};

export default TableItems;
