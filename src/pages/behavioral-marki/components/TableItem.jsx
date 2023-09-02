import { useBehaviorMarkStore } from "../../../store/BehaviorMarkStore";
import PropTypes from "prop-types";
import TableComment from "./comment/Table";

function TableItems({ item, index }) {
  const openCommentModal = () => {
    useBehaviorMarkStore.setState({
      studentId: item?.id,
    });
  };

  const studentCommentModal = () => {
    useBehaviorMarkStore.setState({
      behaviorId: item?.id,
    });
  };

  return (
    <>
      <tr className="bg-white border-b border dark:bg-gray-800 dark:border-gray-700">
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
          {item?.student.full_name}
        </td>
        <td className="border w-[19%] text-center px-3 py-0 h-full xs:text-[10px] sm:text-sm ">
          {item?.status}
        </td>
        <td className="border w-[19%] text-center px-3 py-0 h-full xs:text-[10px] sm:text-sm  ">
          {item?.points}
        </td>
        <td
          onClick={studentCommentModal}
          className="border w-[19%] text-center px-3 py-0 h-full xs:text-[10px] sm:text-sm hover:bg-blue-50 cursor-pointer text-blue-500"
        >
          Izohlar ({item?.comments?.length || 0})
        </td>
        <td className="border w-[10%]  text-center px-3 py-0 h-full xs:text-[10px] sm:text-sm">
          <button
            type="button"
            onClick={openCommentModal}
            className="m-1 text-white text-center bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm  px-2 py-2 "
          >
            <svg
              className="w-4 h-4 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </td>
      </tr>
      <TableComment studentId={item.id} studentComment={item?.comments} />
    </>
  );
}
TableItems.propTypes = {
  formik: PropTypes.any,
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
export default TableItems;
