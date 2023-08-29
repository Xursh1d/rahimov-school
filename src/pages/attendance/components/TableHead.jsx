import { useAttendaceStore } from "../../../store/AttendanceStore";

function TableHead() {
  const { attendance_dates } = useAttendaceStore();

  const openDateModal = () => {
    useAttendaceStore.setState({
      toggleDateModal: true,
    });
  };

  const handleDelete = (date) => {
    useAttendaceStore.setState({
      deletedDate: date,
    });
  };

  return (
    <thead className="xs:text-[10px] sm:text-xs text-gray-700  dark:bg-gray-700 dark:text-gray-400">
      <tr className="py-3 ">
        <th
          rowSpan={2}
          scope="col"
          className="bg-[#ecfccb] px-3 w-[20px] sticky left-0 z-10"
        >
          <span className="absolute -left-[1px] top-0 bottom-0 w-[1.5px] h-full bg-gray-200"></span>
          <span className="absolute -left-[1px] -top-[1px] right-0 w-full h-[1px] bg-gray-200"></span>
          <span className="absolute -right-[1px] -top-[1px] bottom-0 w-[1px] h-full bg-gray-200"></span>
          <span className="absolute right-0 bottom-0 -left-[1px] w-full h-[1px] bg-gray-200"></span>
          #
        </th>
        <th
          scope="col"
          rowSpan={2}
          className="text-center px-3 sticky xs:left-[30px] sm:left-[33px] xs:min-w-[150px] sm:min-w-[200px] bg-[#ecfccb] z-10"
        >
          <span className="absolute -left-[1px] top-0 bottom-0 w-[1px] h-full bg-gray-200"></span>
          <span className="absolute -left-[1px] -top-[1px] right-0 w-full h-[1px] bg-gray-200"></span>
          <span className="absolute -right-[1px] -top-[1px] bottom-0 w-[1px] h-full bg-gray-200"></span>
          <span className="absolute right-0 bottom-0 -left-[1px] w-full h-[1px] bg-gray-200"></span>
          Talaba
        </th>
        {attendance_dates?.map((item) => {
          return (
            <th
              key={item.date}
              scope="col"
              className="border bg-[#ecfccb] border-gray-200 relative text-center max-w-[50px] p-1 cursor-pointer group"
            >
              <span
                onClick={() => handleDelete(item.full_date)}
                className="absolute top-0 left-0 right-0 bottom-0 hidden bg-none hover:bg-[#ed918e] group-hover:flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
              </span>
              {item.date}
            </th>
          );
        })}
        <th
          scope="col"
          rowSpan={2}
          className="border  border-gray-200 p-2 text-center bg-white cursor-pointer"
        >
          <button
            onClick={openDateModal}
            type="button"
            className="cursor-pointer text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm sm:p-2 xs:p-1.5 text-center inline-flex items-center  dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
          >
            <svg
              className="sm:w-6 sm:h-6 xs:w-4 xs:h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 19 20"
            >
              <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </th>
      </tr>

      <tr className="py-3">
        {attendance_dates?.map((item) => {
          return (
            <th
              key={item.date}
              scope="col"
              className="border bg-[#ecfccb] border-gray-200 text-center max-w-[50px] p-1 "
            >
              {item.weekday}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHead;
