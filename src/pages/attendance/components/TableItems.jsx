import PropTypes from "prop-types";
import { useAttendaceStore } from "../../../store/AttendanceStore";

function TableItems({ formik, item, index }) {
  const { attendance_dates, filterset, setChanged } = useAttendaceStore();
  const handleChange = (e, indexDate) => {
    setChanged(true);
    formik.setFieldValue(
      `students.${index}.attendance_data.${indexDate}.status`,
      e.target.value
    );
  };
  return (
    <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 ">
      <td className="w-[20px] px-3 sticky left-0 bg-white xs:text-[10px] sm:text-sm ">
        <span className="absolute -left-[1px] top-0 bottom-0 w-[1.5px] h-full bg-gray-200"></span>
        <span className="absolute -left-[1px] -top-[1px] right-0 w-full h-[1.5px] bg-gray-200"></span>
        <span className="absolute -right-[1px] top-[0px] bottom-0 w-[1px] h-full bg-gray-200"></span>
        <span className="absolute right-0 bottom-0 -left-[1px] w-full h-[1px] bg-gray-200"></span>
        {index + 1}
      </td>
      <td className="sticky sm:left-[33px] xs:left-[30px] bg-white sm:px-2  xs:min-w-[150px] sm:min-w-[200px] xs:px-1 xs:text-[10px] sm:text-sm font-medium text-gray-900 dark:text-white">
        <span className="absolute -left-[1px] top-0 bottom-0 w-[1px] h-full bg-gray-200"></span>
        <span className="absolute -left-[1px] -top-[1px] right-0 w-full h-[1px] bg-gray-200"></span>
        <span className="absolute -right-[1px] -top-[1px] bottom-0 w-[1px] h-full bg-gray-200"></span>
        <span className="absolute right-0 bottom-0 -left-[1px] w-full h-[1px] bg-gray-200"></span>
        {item.student}
      </td>
      {attendance_dates?.map((date, indexDate) => {
        return (
          <td key={date.date} className="border">
            <select
              name={`students.${index}.attendance_data.${indexDate}.status`}
              onChange={(e) => handleChange(e, indexDate)}
              onBlur={formik.handleBlur}
              value={
                formik.values.students?.[index]?.attendance_data?.[indexDate]
                  ?.status
              }
              className={`sm:p-2.5 xs:p-1 h-full bg-inherit xs:text-[10px] sm:text-sm  ${
                formik.touched.students?.[index]?.attendance_data?.[indexDate]
                  ?.status &&
                formik.errors.students?.[index]?.attendance_data?.[indexDate]
                  ?.status &&
                "border border-red-600"
              }   min-w-[50px] xs:text-[10px] sm:text-sm  outline-none text-center  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >
              <option selected></option>
              {filterset?.attendance_options.map((date) => {
                return (
                  <option
                    key={date.key}
                    value={date.key}
                    className="border-red-500 text-start"
                  >
                    {date.name}
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
