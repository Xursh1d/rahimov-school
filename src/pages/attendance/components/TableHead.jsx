import { useAttendaceStore } from "../../../store/AttendanceStore";

function TableHead() {
  const { attendance_dates } = useAttendaceStore();

  const openDateModal = () => {
    useAttendaceStore.setState({
      toggleDateModal: true,
    });
  };

  return (
    <thead className=" border border-[#d9f99d] xs:text-[10px] sm:text-xs text-gray-700 bg-[#ecfccb] dark:bg-gray-700 dark:text-gray-400">
      <tr className="py-3">
        <th rowSpan={2} scope="col" className="border px-3 w-[20px]">
          #
        </th>
        <th scope="col" rowSpan={2} className="border text-center px-3">
          Talaba
        </th>
        {attendance_dates?.map((item) => {
          return (
            <th
              key={item.date}
              scope="col"
              className="border text-center  max-w-[50px] p-1"
            >
              {item.date}
            </th>
          );
        })}
        <th
          scope="col"
          rowSpan={2}
          className="border p-2 text-center bg-white cursor-pointer"
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
              className="border text-center  max-w-[50px] p-1"
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
