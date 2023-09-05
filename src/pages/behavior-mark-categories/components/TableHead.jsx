import { useBehaviorMarkCategoriesStore } from "../../../store/BehaviorMarkCategoriesStore";

function TableHead() {
  return (
    <thead className="xs:text-[10px] sm:text-[11px] text-gray-700  bg-lime-50">
      <tr>
        <th
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
          className="text-center px-3 sticky xs:left-[30px] sm:left-[33px] xs:min-w-[150px] sm:min-w-[200px] bg-[#ecfccb] z-10"
        >
          <span className="absolute -left-[1px] top-0 bottom-0 w-[1px] h-full bg-gray-200"></span>
          <span className="absolute -left-[1px] -top-[1px] right-0 w-full h-[1px] bg-gray-200"></span>
          <span className="absolute -right-[1px] -top-[1px] bottom-0 w-[1px] h-full bg-gray-200"></span>
          <span className="absolute right-0 bottom-0 -left-[1px] w-full h-[1px] bg-gray-200"></span>
          Kategoriya nomi
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[150px]">
          Status
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[150px]">
          Kategoriya balli
        </th>
        <th scope="col" colSpan={2} className="border text-center px-0 py-2">
          <button
            onClick={() =>
              useBehaviorMarkCategoriesStore.setState({
                isOpenModal: true,
              })
            }
            type="button"
            className="text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm sm:px-3 xs:px-2 xs:mx-2 sm:mx-0 sm:py-2 xs:py-1 text-center"
          >
            <div className="flex items-center gap-2">
              <svg
                className="sm:w-5 sm:h-5 xs:w-4 xs:h-4 text-gray-50"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
              </svg>
              <p className="text-xs"> Qo`shish</p>
            </div>
          </button>
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
