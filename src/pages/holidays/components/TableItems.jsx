import PropTypes from "prop-types";

function TableItems({ item, index }) {
  return (
    <tr className="bg-white">
      <td className="w-[20px] px-3 sticky left-0 bg-white xs:text-[10px] sm:text-sm py-2">
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
        {item.start_date} - {item.end_date}
      </td>

      <td className="border xs:min-w-[150px] sm:min-w-[200px] xs:px-1 xs:text-[10px] sm:text-sm font-medium text-gray-900">
        {item.title}
      </td>
      <td
        className="px-2 text-red-500 hover:bg-red-50 cursor-pointer border"
      >
        <div className="w-full flex items-center justify-center border-red-500">
          <svg
            className="sm:w-6 sm:h-6 xs:w-4 xs:h-4 text-red-700"
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
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default TableItems;
