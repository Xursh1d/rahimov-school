import PropTypes from "prop-types";
import { useCallback } from "react";
import { pointToMark } from "../../../helpers/pointsToMark";
import { useAcademicMarkStore } from "../../../store/AcademicMarkStore";

function TableItems({ formik, item, index }) {
  const { setChanged } = useAcademicMarkStore();

  const handleChange = useCallback(
    (e, property) => {
      setChanged(true);
      if (e.target.value === "") {
        formik.setFieldValue(`students.${index}.${[property]}`, 0);
      } else if (e.target.value > 100) {
        formik.setFieldValue(`students.${index}.${[property]}`, 100);
      } else if (e.target.value == 0) {
        formik.setFieldValue(`students.${index}.${[property]}`, 0);
      } else {
        formik.setFieldValue(
          `students.${index}.${[property]}`,
          e.target.value.replace(/^0+/, "")
        );
      }
    },
    [formik]
  );

  return (
    <tr className="bg-white border-b border">
      <td className="w-[20px] px-3 sticky left-0 bg-white xs:text-[10px] sm:text-sm ">
        <span className="absolute -left-[1px] top-0 bottom-0 w-[1.5px] h-full bg-gray-200"></span>
        <span className="absolute -left-[1px] -top-[1px] right-0 w-full h-[1.5px] bg-gray-200"></span>
        <span className="absolute -right-[1px] top-[0px] bottom-0 w-[1px] h-full bg-gray-200"></span>
        <span className="absolute right-0 bottom-0 -left-[1px] w-full h-[1px] bg-gray-200"></span>
        {index + 1}
      </td>
      <td className="sticky sm:left-[33px] xs:left-[30px] bg-white sm:px-2  xs:min-w-[150px] sm:min-w-[200px] xs:px-1 xs:text-[10px] sm:text-sm font-medium text-gray-900">
        <span className="absolute -left-[1px] top-0 bottom-0 w-[1px] h-full bg-gray-200"></span>
        <span className="absolute -left-[1px] -top-[1px] right-0 w-full h-[1px] bg-gray-200"></span>
        <span className="absolute -right-[1px] -top-[1px] bottom-0 w-[1px] h-full bg-gray-200"></span>
        <span className="absolute right-0 bottom-0 -left-[1px] w-full h-[1px] bg-gray-200"></span>
        {item.student}
      </td>
      <td className={`border`}>
        <input
          name={`students.${index}.first_term_points`}
          onChange={(e) => handleChange(e, "first_term_points")}
          onBlur={formik.handleBlur}
          value={formik.values.students?.[index]?.first_term_points}
          type="number"
          className={`px-3 py-3 h-full xs:text-[10px] sm:text-sm  ${formik.touched.students?.[index]?.first_term_points &&
            formik.errors.students?.[index]?.first_term_points &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5`}
        />
      </td>
      <td className="border">
        <input
          type="number"
          name={`students.${index}.second_term_points`}
          onChange={(e) => handleChange(e, "second_term_points")}
          onBlur={formik.handleBlur}
          value={formik.values.students?.[index]?.second_term_points}
          className={`px-3 py-3 h-full xs:text-[10px] sm:text-sm  ${formik.touched.students?.[index]?.second_term_points &&
            formik.errors.students?.[index]?.second_term_points &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5`}
        />
      </td>

      <td className="border">
        <input
          value={(
            (Number(formik.values.students?.[index]?.first_term_points) +
              Number(formik.values.students?.[index]?.second_term_points)) /
            2
          ).toFixed(0)}
          type="number"
          disabled
          className="px-3 py-3 bg-lime-50 h-full xs:text-[10px] sm:text-sm outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5"
        />
      </td>

      <td className="border">
        <input
          type="number"
          defaultValue={pointToMark(
            (
              (Number(formik.values.students?.[index]?.first_term_points) +
                Number(formik.values.students?.[index]?.second_term_points)) /
              2
            ).toFixed(0)
          )}
          disabled
          className="px-3 py-3 bg-lime-50 h-full xs:text-[10px] sm:text-sm    outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 "
        />
      </td>

      <td className="border">
        <input
          type="number"
          min={0}
          name={`students.${index}.final_term_points`}
          onChange={(e) => handleChange(e, "final_term_points")}
          onBlur={formik.handleBlur}
          value={formik.values.students?.[index]?.final_term_points}
          className={`px-3 py-3 h-full xs:text-[10px] sm:text-sm  ${formik.touched.students?.[index]?.final_term_points &&
            formik.errors.students?.[index]?.final_term_points &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 `}
        />
      </td>
      <td className="border">
        <input
          type="number"
          defaultValue={pointToMark(
            formik.values.students?.[index]?.final_term_points
          )}
          disabled
          className="px-3 py-3 bg-lime-50 h-full xs:text-[10px] sm:text-sm    outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5 "
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
