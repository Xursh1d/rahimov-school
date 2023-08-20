import { useEffect } from "react";
import { useAttendaceStore } from "../../../store/AttendanceStore";
import TableHead from "./TableHead";
import TableItems from "./TableItems";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  studentComment: [],
};

function Table() {
  const { students } = useAttendaceStore();

  useEffect(() => {
    students?.forEach((element, index) => {
      formik.setFieldValue(`students.${index}.id`, element["id"], false);
      formik.setFieldValue(
        `students.${index}.content`,
        element["content"],
        false
      );
      formik.setFieldValue(
        `students.${index}.marked_teacher`,
        element["marked_teacher"],
        false
      );
      formik.setFieldValue(
        `students.${index}.category_id`,
        String(element["comment_category_id"]),
        false
      );
    });
  }, [students]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: false,
    validationSchema: Yup.object({
      students: Yup.array().of(
        Yup.object().shape({
          content: Yup.string(),
          marked_teacher: Yup.string(),
          category_id: Yup.string(),
          id: Yup.number().min(1, "Required").required("Required"),
        })
      ),
    }),
  });

  return (
    <div className="my-4 xs:rounded-lg w-fit">
      <table className="w-full xs:text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHead />
        <tbody>
          {students?.map((item, index) => {
            return (
              <TableItems
                formik={formik}
                item={item}
                key={index}
                index={index}
              />
            );
          })}
        </tbody>
      </table>
      <div className="mt-5px relative w-[100%] h-[50px] flex items-center justify-end">
        <button
          type="button"
          className="sticky right-0 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 text-center xs:px-3 xs:py-2 xs:text-xs"
        >
          Saqlash
        </button>
      </div>
    </div>
  );
}

export default Table;
