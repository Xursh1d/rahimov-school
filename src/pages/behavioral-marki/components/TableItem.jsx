import { useBehaviorMarkStore } from "../../../store/BehaviorMarkStore";

function TableItems({ item, index }) {
  const openCommentModal = () => {
    useBehaviorMarkStore.setState({
      // studentId: item?.id,
      studentId: 1,
    });
  };

  return (
    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
      <td className="p-3 max-w-[10px] border text-center">{index + 1}</td>
      <th
        scope="row"
        className="px-3  font-medium text-gray-900 dark:text-white text-center"
      >
        {item?.student}
      </th>
      <td className="border w-[19%] text-center ">{item?.status}</td>
      <td className="border w-[19%] text-center ">{item?.points}</td>
      <td className="border w-[19%] text-center ">Izohlar (0)</td>
      <td className="border w-[10%]  text-center">
        <button
          type="button"
          onClick={openCommentModal}
          className="m-1 text-white text-center bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm  px-3 py-2 "
        >
          <svg
            className="w-5 h-5 text-white dark:text-white"
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
  );
}

export default TableItems;
