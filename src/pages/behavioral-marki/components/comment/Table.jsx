import { useEffect } from "react";
import TableHead from "./TableHead";
import TableItems from "./TableItems";
import { useBehaviorMarkStore } from "../../../../store/BehaviorMarkStore";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  studentComment: [],
};

function TableComment({ studentId, studentComment }) {
  const { behaviorId } = useBehaviorMarkStore();

  useEffect(() => {
    studentComment?.forEach((element, index) => {
      formik.setFieldValue(`studentComment.${index}.id`, element["id"], false);
      formik.setFieldValue(
        `studentComment.${index}.content`,
        element["content"],
        false
      );
      formik.setFieldValue(
        `studentComment.${index}.marked_teacher`,
        element["marked_teacher"],
        false
      );
      formik.setFieldValue(
        `studentComment.${index}.marked_time`,
        element["marked_time"],
        false
      );
      formik.setFieldValue(
        `studentComment.${index}.category_id`,
        String(element["comment_category_id"]),
        false
      );
    });
  }, [behaviorId]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: false,
    validationSchema: Yup.object({
      studentComment: Yup.array().of(
        Yup.object().shape({
          content: Yup.string(),
          marked_teacher: Yup.string(),
          marked_time: Yup.string(),
          category_id: Yup.string(),
          id: Yup.number().min(1, "Required").required("Required"),
        })
      ),
    }),
  });

  const closeModal = () => {
    useBehaviorMarkStore.setState({
      behaviorId: null,
    });
    formik.resetForm();
  };

  return (
    <div
      onClick={() => closeModal()}
      id="defaultModal"
      aria-hidden="true"
      className={`fixed flex items-center justify-center transition-all top-0 left-0 bottom-0 right-0 z-50 ${
        !behaviorId == studentId ? "hidden" : "bg-[#66656547] dark:#3a3839ad"
      }  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-full"
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
          <div className="p-6 text-center ">
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
              Izohlar
            </h3>
            <form
              onSubmit={formik.handleSubmit}
              className="my-4 overflow-x-auto "
            >
              {studentComment?.length > 0 ? (
                <table className=" xs:text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400">
                  <TableHead />
                  <tbody>
                    {studentComment?.map((item, index) => {
                      return (
                        <TableItems formik={formik} key={index} index={index} />
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h3 className="mb-1 text-lg font-normal text-red-500">
                  Izoh mavjud emas !
                </h3>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
TableComment.propTypes = {
  studentId: PropTypes.number,
  studentComment: PropTypes.any,
};
export default TableComment;
