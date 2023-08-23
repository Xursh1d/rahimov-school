import { useEffect, useState } from "react";
import { useAttendaceStore } from "../../../store/AttendanceStore";
import TableHead from "./TableHead";
import TableItems from "./TableItems";
import { useFormik } from "formik";
import * as Yup from "yup";

function Table() {
  const {
    students,
    attendance_dates,
    setLoader,
    loadItems,
    queryParams,
    attendanceUpdate,
    setChanged,
    changed,
  } = useAttendaceStore();
  const [isLoading, setLoading] = useState(false);

  const initialValues = {
    students:
      students?.map(() => ({
        attendance_data: attendance_dates?.map(() => ({
          attendance_id: null,
          status: null,
        })),
      })) || [],
  };

  useEffect(() => {
    students?.forEach((element, index) => {
      attendance_dates?.forEach((date, indexDate) => {
        const status_student = element.attendance_statuses?.[date.date] || {};
        formik.setFieldValue(
          `students.${index}.attendance_data.${indexDate}.attendance_id`,
          status_student?.attendance_id,
          false
        );
        formik.setFieldValue(
          `students.${index}.attendance_data.${indexDate}.status`,
          status_student?.status,
          false
        );
      });
    });
    setChanged(false);
  }, [students]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: false,
    validationSchema: Yup.object({
      students: Yup.array().of(
        Yup.object().shape({
          attendance_data: Yup.array().of(
            Yup.object().shape({
              attendance_id: Yup.number().nullable().required(),
              status: Yup.string().nullable().required(),
            })
          ),
        })
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await attendanceUpdate(values.students);
      setLoading(false);
      setLoader(true);
      await loadItems(
        new URLSearchParams({
          ...queryParams,
        }).toString()
      );
      setLoader(false);
    },
  });
  console.log(formik.errors);
  return (
    <form onSubmit={formik.handleSubmit} className="my-4 xs:rounded-lg w-fit">
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
          disabled={!changed}
          type="submit"
          className={`${!changed && "opacity-60 pointer-events-none"}
          }sticky right-0 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 text-center xs:px-3 xs:py-2 xs:text-xs`}
        >
          {isLoading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Saqlash"
          )}
        </button>
      </div>
    </form>
  );
}

export default Table;
