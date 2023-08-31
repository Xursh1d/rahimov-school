import PropTypes from "prop-types";

function TableItems({ item, index }) {
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
        {item.title}
      </td>

      <td className="border sm:px-2 w-[50px] xs:px-1  sm:text-sm  outline-none text-center p-2.5">
        {item.start_date} - {item.end_date}
      </td>
    </tr>
  );
}

TableItems.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default TableItems;
